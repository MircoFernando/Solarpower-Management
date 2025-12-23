import { z } from "zod";

export const CreateRegisteredUserDto = z.object({
  userName: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .trim(),

  clerkUserId: z
    .string()
    .min(1, "Clerk User ID is required"),

  firstName: z
    .string()
    .min(1, "First name is required")
    .trim(),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .trim(),

  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),

  phoneNumber: z
    .string()
    .min(7, "Phone number is required"),

  address: z
    .string()
    .min(5, "Address is required"),

  city: z
    .string()
    .min(2, "City is required"),

  country: z
    .string()
    .min(2, "Country is required"),

  postalCode: z
    .string()
    .optional(),

  propertyType: z.enum(["Residential", "Commercial", "Industrial"] as const, {
    message: "Property type is required",
  }),

  roofType: z
    .enum(["Flat", "Sloped", "Metal", "Tile", "Concrete"])
    .optional(),

  avgConsumption: z
    .number()
    .positive("Average consumption must be positive")
    .optional(),

  systemType: z
    .enum(["Grid-tied", "Off-grid", "Hybrid"])
    .optional(),

  timeline: z
    .enum(["ASAP", "1-3 months", "3-6 months"])
    .optional(),

  budget: z
    .number()
    .positive("Budget must be a positive number")
    .optional(),

  financing: z
    .enum(["Yes", "No"])
    .optional(),

  status: z
    .enum(["pending", "approved", "rejected"])
    .optional(), 
  solarUnitSerialNo: z
    .string()
    .min(2, "Serial number is required")
    .optional(),
});

export const UpdateRegisteredUserDto = z.object({
  userName: z.string().min(3).optional(),

  clerkUserId: z.string().min(3).optional(),

  firstName: z.string().min(2).optional(),

  lastName: z.string().min(2).optional(),

  email: z.string().email().optional(),

  phoneNumber: z.string().min(10).optional(),

  address: z.string().min(5).optional(),

  city: z.string().min(2).optional(),

  postalCode: z.string().optional(),

  propertyType: z.enum(
    ["Residential", "Commercial", "Industrial"]
  ).optional(),

  roofType: z.enum(
    ["Flat", "Sloped", "Metal", "Tile", "Concrete"]
  ).optional(),

  avgConsumption: z.number().positive().optional(),

  systemType: z.enum(
    ["Grid-tied", "Off-grid", "Hybrid"]
  ).optional(),

  timeline: z.enum(
    ["ASAP", "1-3 months", "3-6 months"]
  ).optional(),

  budget: z.number().positive().optional(),

  financing: z.enum(["Yes", "No"]).optional(),

  status: z.enum(
    ["pending", "approved", "rejected"]
  ).optional(),

  solarUnitSerialNo: z.string().optional(),

});