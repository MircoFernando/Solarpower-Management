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
    },

    userName: {
      type: String,
      required: true,
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

    amount: {
      type: Number,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
      required: true,
    },
    amount: {
        type: Number,
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
