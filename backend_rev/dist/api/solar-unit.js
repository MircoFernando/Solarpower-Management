"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const solar_unit_1 = require("../application/solar-unit");
const solarUnitRouter = express_1.default.Router();
solarUnitRouter.route("/").get(solar_unit_1.getAllSolarUnits).post(solar_unit_1.createSolarUnit);
solarUnitRouter.route("/:id").get(solar_unit_1.getSolarUnitById);
solarUnitRouter.route("/:id").put(solar_unit_1.updateSolarUnitById); // id is the parameter in the URL "id" is the variable name
solarUnitRouter.route("/:id").delete(solar_unit_1.deleteSolarUnitById);
exports.default = solarUnitRouter;
