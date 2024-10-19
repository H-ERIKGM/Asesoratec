import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    hourStart:{
        type: Number,
        required: true,
    },
    hourFinish:{
        type: Number,
        required: true,
    },
    classroom:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true,
    }
})

export default mongoose.model("Subject", subjectSchema);