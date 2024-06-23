const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("January 27, 2027"),
  target: "Kepler-442 b",
  customers: ["NASA", "CAVS"],
  upcoming: true,
  success: true,
};

const saveLaunch = async (launch) => {
  const planet = await planets.findOne(
    { keplerName: launch.target },
    { _id: 0, __v: 0 }
  );

  if (!planet) {
    throw new Error("No matching planet found !");
  }

  await launches.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true }
  );
};

saveLaunch(launch);

const existLaunchWithId = async (launchId) => {
  return await launches.findOne({ flightNumber: launchId });
};

const getAllLaunches = async () => {
  return await launches.find({}, { _id: 0, __v: 0 });
};

const getLatestFlightNumber = async () => {
  const latestFlight = await launches.findOne().sort("-flightNumber");

  if (!latestFlight) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestFlight.flightNumber;
};

const scheduleNewLaunch = async (launch) => {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found !");
  }

  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["NASA", "CAVS"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
};

const abortLaunchById = async (launchId) => {
  const aborted = await launches.updateOne(
    { flightNumber: launchId },
    { success: false, upcoming: false }
  );

  return aborted.modifiedCount === 1 && aborted.matchedCount === 1;
};

module.exports = {
  existLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
  getLatestFlightNumber,
};
