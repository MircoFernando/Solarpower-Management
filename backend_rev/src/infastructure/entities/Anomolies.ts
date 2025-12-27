import mongoose from "mongoose";

const AnomalyRecordSchema = new mongoose.Schema(
  {
    solarUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SolarUnit',
      required: true,
    },
    energyGenRecordId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    anomalyType: {
      type: String,
      enum: ['ZERO_GENERATION', 'GENERATION_DROP', 'ABNORMAL_PEAK', 'NIGHT_GENERATION'],
      required: true,
    },
    severity: {
      type: String,
      enum: ['CRITICAL', 'WARNING', 'INFO'],
      required: true,
    },
    detectedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    status: {
      type: String,
      enum: ['OPEN', 'ACKNOWLEDGED', 'RESOLVED'],
      default: 'OPEN',
    },
  },
  {
    timestamps: true,
  }
);
export const AnomalyRecords = mongoose.model('AnomalyRecord', AnomalyRecordSchema);