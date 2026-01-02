import express from 'express';
import { getAllInVoices, getInvoiceForUser } from '../application/Invoice';


const InvoiceRouter = express.Router();

InvoiceRouter.route("/").get(getAllInVoices);
InvoiceRouter.route("/user").get(getInvoiceForUser);

export default InvoiceRouter; 