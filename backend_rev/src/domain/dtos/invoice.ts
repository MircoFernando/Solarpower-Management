import { z } from "zod";

// MongoDB ObjectId validator
const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

export const CreateInvoiceDto = z.object({
  solarUnitId: objectId,

  clerkUserId: z.string().min(1),

  userName: z.string().min(1),

  billingPeriodStart: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid billingPeriodStart date",
    }),

  billingPeriodEnd: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid billingPeriodEnd date",
    }),

  totalEnergyGenerated: z.number().min(0),

  paymentStatus: z.enum(["PENDING", "PAID", "FAILED"]).optional(),
});

export const UpdateInvoicePaymentStatusDto = z.object({
  paymentStatus: z.enum(["PENDING", "PAID", "FAILED"]),

  paidAt: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), {
      message: "Invalid paidAt date",
    }),
});

export const InvoiceIdDto = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid Invoice ID"),
});




