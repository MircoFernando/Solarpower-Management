import express from 'express';
import { getEnergyRecordsBySolarUnitId, getallEnergyRecords, validateIdParam} from '../application/energy-generation-record';
import { authenticationMiddleware } from './middleware/authentication-middleware';

const energyGenerationRecordRouter = express.Router();

energyGenerationRecordRouter.route('/solar-units/:id').get(authenticationMiddleware, getEnergyRecordsBySolarUnitId);
energyGenerationRecordRouter.route('/solar-units').get(authenticationMiddleware, getallEnergyRecords);

export default energyGenerationRecordRouter;