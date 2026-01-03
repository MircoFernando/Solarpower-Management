import express from 'express';
import { getCapacityFactor, getPeakOffPeakDistribution } from './../application/metrics';

const Metricsrouter = express.Router();

Metricsrouter.route('/capacity-factor').get(getCapacityFactor);
Metricsrouter.route('/peak-offpeak').get(getPeakOffPeakDistribution);

export default Metricsrouter;