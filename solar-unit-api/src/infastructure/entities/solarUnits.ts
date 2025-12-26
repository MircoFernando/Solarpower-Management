import mongoose from "mongoose";

const SolarUnitSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["active", "inactive", "maintenance"],
    default: "active",
  },
});

export const SolarUnit = mongoose.model("SolarUnit", SolarUnitSchema);
