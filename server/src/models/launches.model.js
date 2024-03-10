const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("January 27, 2027"),
  target: "Kepler-422 b",
  customer: ["NASA", "CAVS"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
  return Array.from(launches.values());
};

const addNewLaunch = (launch) => {
  latestFlightNumber++;
  launches.set(
    launch.flightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ["NASA", "CAVS"],
      flightNumber: latestFlightNumber,
    })
  );
};

module.exports = {
  getAllLaunches,
  addNewLaunch,
};
