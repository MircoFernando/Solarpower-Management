import Stripe from "stripe";
import { Request, Response } from "express";
import { NotFoundError, ValidationError } from "../domain/dtos/errors/errors";
import { Invoice } from "../infastructure/entities/Invoice";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export const createCheckoutSession = async (req: Request, res: Response) => {
  // 1. Get invoice (use your existing auth + query patterns)
  const invoice = await Invoice.findById(req.body.invoiceId);

  if (!invoice) {
    throw new NotFoundError("Invoice not found");
  }

  if (invoice.paymentStatus === "PAID") {
    throw new ValidationError("Invoice already paid");
  }

  // 2. Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,  // Your Price ID from Dashboard
        quantity: Math.round(invoice.totalEnergyGenerated),  // kWh as quantity
      },
    ],
    mode: "payment",
    return_url: `${process.env.FRONTEND_URL}/dashboard/invoices/complete?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      invoiceId: invoice._id.toString(),  // Critical: links session to your invoice
    },
  });

  // 3. Return client secret to frontend
  res.json({ clientSecret: session.client_secret });
};

export const getSessionStatus = async (req: Request, res: Response) => {
  const { session_id } = req.query;

  const session = await stripe.checkout.sessions.retrieve(session_id as string);

  res.json({
    status: session.status,
    paymentStatus: session.payment_status,
    amountTotal: session.amount_total,  // Amount in cents
  });
};


export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  // 1. Verify webhook signature (SECURITY: proves request is from Stripe)
  try {
    event = stripe.webhooks.constructEvent(
      req.body,  // Must be raw body, not parsed JSON
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. Handle payment completion
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoiceId = session.metadata?.invoiceId;

    if (invoiceId && session.payment_status === "paid") {
      await Invoice.findByIdAndUpdate(invoiceId, {
        paymentStatus: "PAID",
        paidAt: new Date(),
      });
      console.log("Invoice marked as PAID:", invoiceId);
    }
  }

  // 3. Always return 200 to acknowledge receipt
  res.status(200).json({ received: true });
};

