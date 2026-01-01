import mongoose from "mongoose";
import { required } from "zod/v4/core/util.cjs";

const InvoiceSchema = new mongoose.Schema(
  {
    solarUnitId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'SolarUnit',
      required: true,
    },

    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },

    billingPeriodStart: {
        type: Date, 
        required: true
    },

    billingPeriodEnd: {
        type: Date, 
        required: true
    },

    totalEnergyGenerated: {
        type: Number,
        required: true
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      required: true,
    },

    paidAt: {
        type: Date
    }
  },
  {
    timestamps: true, 
  }
);

export const Invoice = mongoose.model('Invoice', InvoiceSchema);

//TODO : Start doing from the 5th step