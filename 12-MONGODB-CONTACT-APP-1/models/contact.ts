import mongoose from "mongoose"

//Membuat Schema
export const Contact = mongoose.model('Contact', new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    noHp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
}))