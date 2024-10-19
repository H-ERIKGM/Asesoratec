import mongoose from 'mongoose'

const registerSchema = new mongoose.Schema({
    status:{
        type: Boolean,
        required: true,
    },
    registerDate:{
        type: Date,
        default: Date.now,
    },
    endDate:{
        type: Date,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    counseling:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'counseling',
        required: true,
    }
})

export default mongoose.model("Register", registerSchema);