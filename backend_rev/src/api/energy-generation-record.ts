import express from 'express';
import { getEnergyRecordsBySolarUnitId, getallEnergyRecords} from '../application/energy-generation-record';


const energyGenerationRecordRouter = express.Router();

energyGenerationRecordRouter.route('/solar-units/:id').get(getEnergyRecordsBySolarUnitId);
energyGenerationRecordRouter.route('/solar-units').get(getallEnergyRecords);

export default energyGenerationRecordRouter;