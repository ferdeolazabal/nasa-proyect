const express = require("express");

const planetController = require("./planets.controller");
const { getAllPlanets } = require("./planets.controller");
const planetsRouter = express.Router();

planetsRouter.get("/planets", getAllPlanets);

module.exports = planetsRouter;
