import { group } from "console";
import { z } from "zod";


// Validate MongoDB ObjectId format
export const idDto = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId format"),
});

// Validate groupBy and limit
export const getallEnergyRecordsDto = z.object({
  groupBy : z.enum(['date']).optional(),
  limit: z.string().min(1).optional(),
});