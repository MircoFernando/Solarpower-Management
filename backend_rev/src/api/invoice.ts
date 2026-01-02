import express from 'express';
import { getAllInVoices, getInvoiceById, getInvoiceForUser } from '../application/Invoice';


const InvoiceRouter = express.Router();

InvoiceRouter.route("/").get(getAllInVoices);
InvoiceRouter.route("/user").get(getInvoiceForUser);
InvoiceRouter.route("/user/:id").get(getInvoiceById);
export default InvoiceRouter; 