import { Invoice } from "../infastructure/entities/Invoice";
import { getAuth } from "@clerk/express";
import { RegisteredUser } from "../infastructure/entities/registeredUsers";
import { Request, Response, NextFunction } from "express";
import { NotFoundError, ValidationError } from "../domain/dtos/errors/errors";

export const getInvoiceForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try{
        const auth = getAuth(req);
        console.log("Authentication info:", auth);
        const clerkUserid = auth.userId;
        console.log("Clerk UserID:", clerkUserid);
        const user = await RegisteredUser.findOne({ clerkUserId: clerkUserid });
        console.log("User:", user?._id);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const invoice = await Invoice.find({ clerkUserId: clerkUserid});
        console.log("User Invoice: ", invoice);

        if(!invoice){
            throw new NotFoundError("Invoice not Found");
        }
        res.status(200).json(invoice[0]);
    } catch (error: any){
        next(error);
    }
}

export const getAllInVoices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try{
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error: any){
        next(error);
    }
}