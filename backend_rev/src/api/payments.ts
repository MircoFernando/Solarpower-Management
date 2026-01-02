import express from 'express';
import InvoiceRouter from './invoice';
import { authenticationMiddleware } from './middleware/authentication-middleware';
import { createCheckoutSession, getSessionStatus } from '../application/payment';

const PaymentRouter = express.Router();

PaymentRouter.post("/create-checkout-session", authenticationMiddleware, createCheckoutSession);
PaymentRouter.get("/session-status", authenticationMiddleware, getSessionStatus);

export default PaymentRouter;