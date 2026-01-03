import express from 'express';
import { getAllInVoices, getInvoiceForUser, updateInvoiceStatus, validateIdParam } from '../application/Invoice';


const InvoiceRouter = express.Router();

InvoiceRouter.route("/").get(getAllInVoices);
InvoiceRouter.route("/user").get(getInvoiceForUser);
InvoiceRouter.route("/user/:id").put(validateIdParam, updateInvoiceStatus);

export default InvoiceRouter; 