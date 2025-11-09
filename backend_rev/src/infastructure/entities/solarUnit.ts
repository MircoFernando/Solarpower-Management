import mongoose from 'mongoose';



const solarUnitSchema = new mongoose.Schema({

    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    serial_number: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    houseID: { type: mongoose.Schema.Types.ObjectId, ref: 'House', unique: true },
    installation_date: { type: Date, required: true },
    status: { type: String, enum: ['active', 'inactive', 'maintenance'], default: 'active' },
    
});

export const SolarUnit = mongoose.model('SolarUnit', solarUnitSchema);