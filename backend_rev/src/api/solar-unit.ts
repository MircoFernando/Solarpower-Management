import express from 'express';
import { getAllSolarUnits, createSolarUnit, getSolarUnitById, updateSolarUnitById, deleteSolarUnitById, createSolarUnitValidator, validateIdParam, getSolarUnitUserByClerkUserId} from '../application/solar-unit';
import { authenticationMiddleware } from './middleware/authentication-middleware';

const solarUnitRouter = express.Router();

solarUnitRouter.route("/").get(getAllSolarUnits).post(createSolarUnitValidator, createSolarUnit);
solarUnitRouter.route("/user").get(authenticationMiddleware, getSolarUnitUserByClerkUserId);
solarUnitRouter.route("/:id").get(validateIdParam, getSolarUnitById);
solarUnitRouter.route("/:id").put(validateIdParam, updateSolarUnitById); // id is the parameter in the URL "id" is the variable name
solarUnitRouter.route("/:id").delete(validateIdParam, deleteSolarUnitById);

export default solarUnitRouter;