import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
    classroom:{
        type: String,
        required: true
    }
});

export default mongoose.model("Classroom", classroomSchema);