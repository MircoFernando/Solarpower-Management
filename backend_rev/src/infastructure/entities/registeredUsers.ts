import mongoose from "mongoose";

const RegisteredUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    country: {
        type: String,
        required: true,
    },

    postalCode: {
      type: String,
    },

    propertyType: {
      type: String,
      enum: ["Residential", "Commercial", "Industrial"],
      required: true,
    },

    roofType: {
      type: String,
      enum: ["Flat", "Sloped", "Metal", "Tile", "Concrete"],
    },

    avgConsumption: {
      type: Number, 
    },

    systemType: {
      type: String,
      enum: ["Grid-tied", "Off-grid", "Hybrid"],
    },

    timeline: {
      type: String,
      enum: ["ASAP", "1-3 months", "3-6 months"],
    },

    budget: {
      type: Number,
    },

    financing: {
      type: String,
      enum: ["Yes", "No"],
    },

    description: {
        type: String,
    },
    // 🔑 Admin workflow
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    solarUnitSerialNo: {
      type: String,
      default: "not assigned"
    }
  },
  {
    timestamps: true, 
  }
);

export const RegisteredUser = mongoose.model('RegisteredUser', RegisteredUserSchema);
