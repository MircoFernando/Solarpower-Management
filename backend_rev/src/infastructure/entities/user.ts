import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    firstname: { type: String},
    lastname: { type: String},
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    clerkUserId: { type: String, required: true, unique: true },
});

export const User = mongoose.model('User', userSchema);