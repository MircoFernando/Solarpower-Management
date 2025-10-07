import mongoose from "mongoose";

export const House  = new mongoose.Schema({
    address: { type: String, required: true },
    solarUnitid: { type: mongoose.Schema.Types.ObjectId, ref: 'SolarUnit', unique: true },

});
export const HouseModel = mongoose.model('House', House);