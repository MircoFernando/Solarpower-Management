import express from 'express';
import { getCapacityFactor, getPeakOffPeakDistribution } from './../application/metrics';
import { authenticationMiddleware } from './middleware/authentication-middleware'; 

const Metricsrouter = express.Router();

Metricsrouter.route('/capacity-factor').get(authenticationMiddleware, getCapacityFactor);
Metricsrouter.route('/peak-offpeak').get(authenticationMiddleware, getPeakOffPeakDistribution);

export default Metricsrouter;