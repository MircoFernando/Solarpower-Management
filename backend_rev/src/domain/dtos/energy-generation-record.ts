import { z } from "zod";


// Validate MongoDB ObjectId format
export const idDto = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId format"),
});