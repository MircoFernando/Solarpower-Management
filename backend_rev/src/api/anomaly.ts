import express from "express";
import { getAllAnomalyRecords, getAnomalyForUser } from "../application/anomaly";


const AnomalyRecordsRouter = express.Router();

AnomalyRecordsRouter.route('/solar-unit/user').get(getAnomalyForUser);
AnomalyRecordsRouter.route('/solar-unit').get(getAllAnomalyRecords);

export default AnomalyRecordsRouter;