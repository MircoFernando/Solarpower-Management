import express from 'express';
import { getAllInVoices, getInvoiceById, getInvoiceForUser, updateInvoiceStatus, validateIdParam } from '../application/Invoice';
import { authenticationMiddleware } from './middleware/authentication-middleware';
import { authorizaztionMiddleware } from './middleware/authorization-middleware';


const InvoiceRouter = express.Router();

InvoiceRouter.route("/").get(authorizaztionMiddleware, getAllInVoices);
InvoiceRouter.route("/user").get(authenticationMiddleware, getInvoiceForUser);
InvoiceRouter.route("/user/:id").get(authenticationMiddleware, getInvoiceById).put(authenticationMiddleware, validateIdParam, updateInvoiceStatus);

export default InvoiceRouter; 