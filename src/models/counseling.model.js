import mongoose from 'mongoose'

const counselingSchema = new mongoose.Schema({
    hour:{
        type: Number,
        required: true,
    },
    day:{
        type: Number,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    }
})

export default mongoose.model("Counseling", counselingSchema);