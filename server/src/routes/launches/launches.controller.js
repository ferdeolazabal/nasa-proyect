const {
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

const httpGetAllLaunches = async (req, res) => {
  return res.status(200).json(await getAllLaunches());
};

const httpAddNewLaunch = async (req, res) => {
  const launch = req.body;
  const { mission, rocket, launchDate, target } = launch;

  if (!mission || !rocket || !launchDate || !target) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  try {
    await scheduleNewLaunch(launch);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(201).json(launch);
};

const httpAbortLaunch = (req, res) => {
  const launchId = +req.params.id;

  if (!existLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  } else {
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
  }
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
