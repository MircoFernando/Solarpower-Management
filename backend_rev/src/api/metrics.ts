import express from 'express';
import { getCapacityFactor, getPeakOffPeakDistribution } from './../application/metrics';

const Metricsrouter = express.Router();

Metricsrouter.get('/capacity-factor', getCapacityFactor);
Metricsrouter.get('/peak-offpeak', getPeakOffPeakDistribution);

export default Metricsrouter;