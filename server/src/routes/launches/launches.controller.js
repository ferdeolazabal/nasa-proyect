const {
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");
const { getPagination } = require("../../services/query");

const httpGetAllLaunches = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);

  return res.status(200).json(launches);
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
    return res.status(201).json(launch);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const httpAbortLaunch = async (req, res) => {
  const launchId = +req.params.id;

  const existLaunch = await existLaunchWithId(launchId);

  if (!existLaunch) {
    return res.status(404).json({ error: "Launch not found" });
  }

  try {
    const aborted = await abortLaunchById(launchId);

    if (!aborted) {
      res.status(400).json({ error: "Launch not aborted" });
    } else {
      res.status(200).json({ ok: true, msg: "Launch aborted" });
    }
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
