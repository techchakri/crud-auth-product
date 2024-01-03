import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true
    }
});


export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema) 