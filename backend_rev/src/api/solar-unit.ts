import express from 'express';
import { getAllSolarUnits, createSolarUnit, getSolarUnitById, updateSolarUnitById, deleteSolarUnitById, createSolarUnitValidator, validateIdParam, getSolarUnitUserByClerkUserId, getNewSolarUnitUsers} from '../application/solar-unit';
import { authenticationMiddleware } from './middleware/authentication-middleware';
import { authorizaztionMiddleware } from './middleware/authorization-middleware';
import { syncMiddleware } from './middleware/sync/sync-middleware';
const solarUnitRouter = express.Router();

solarUnitRouter.route("/").get(getAllSolarUnits).post(authenticationMiddleware, createSolarUnitValidator, createSolarUnit);
solarUnitRouter.route("/user").get(authenticationMiddleware, syncMiddleware,getSolarUnitUserByClerkUserId);
solarUnitRouter.route("/newusers").get(getNewSolarUnitUsers);
solarUnitRouter.route("/:id").get(authenticationMiddleware, validateIdParam, getSolarUnitById);
solarUnitRouter.route("/:id").put(authorizaztionMiddleware, validateIdParam, updateSolarUnitById); // id is the parameter in the URL "id" is the variable name
solarUnitRouter.route("/:id").delete(authorizaztionMiddleware, validateIdParam, deleteSolarUnitById);

export default solarUnitRouter;