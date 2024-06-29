// @ts-nocheck
const launches = require("./launches.mongo");
const planets = require("./planets.mongo");
const axios = require("axios");

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

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

const findLaunch = async (filter) => {
  return await launches.findOne(filter);
};

const populateLaunches = async () => {
  console.log("Downloading launch data...");

  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        { path: "rocket", select: { name: 1 } },
        { path: "payloads", select: { customers: 1 } },
      ],
    },
  });

  if (response.status !== 200) {
    console.log(`Problem downloading launch data: ${response.status}`);
    throw new Error("Launch data download failed");
  }

  const launchDocs = response.data.docs;
  try {
    for (const launchDoc of launchDocs) {
      const payloads = launchDoc["payloads"];

      const launch = {
        flightNumber: launchDoc["flight_number"],
        mission: launchDoc["name"],
        rocket: launchDoc["rocket"]["name"],
        launchDate: launchDoc["date_local"],
        target: launchDoc["links"]["mission_patch"],
        upcoming: launchDoc["upcoming"],
        success: launchDoc["success"],
        customers: payloads.flatMap((payload) => payload["customers"]),
      };

      await saveLaunch(launch);
    }
  } catch (e) {
    console.log("Error while saving launches:", { e });
  }

  console.log("Launch data downloaded");
};

const loadLaunchData = async () => {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
  });

  if (firstLaunch) {
    console.log("Launch data already loaded");
  } else {
    await populateLaunches();
  }
};

const saveLaunch = async (launch) => {
  await launches.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true }
  );
};

saveLaunch(launch);

const existLaunchWithId = async (launchId) => {
  return await findLaunch({ flightNumber: launchId });
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
  const planet = await planets.findOne(
    { keplerName: launch.target },
    { _id: 0, __v: 0 }
  );

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
  loadLaunchData,
};
