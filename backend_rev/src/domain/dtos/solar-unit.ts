
import { z } from "zod";

export const CreateSolarUnitDto = z.object({
    userId : z.string().min(1),
    capacity: z.number().min(0),
    serial_number: z.string().min(1),
    installation_date: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
    }),
    status: z.enum(['active', 'inactive', 'maintenance']),
    
});

export const UpdateSolarUnitDto = z.object({
    capacity: z.number().min(0),
    serial_number: z.string().min(1),
    installation_date: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
    }),
    status: z.enum(['active', 'inactive', 'maintenance']),
    
});

// Validate MongoDB ObjectId format
export const idDto = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId format"),
});


    