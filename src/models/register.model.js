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
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    counseling:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Counseling',
        required: true,
    }
})

export default mongoose.model("Register", registerSchema);