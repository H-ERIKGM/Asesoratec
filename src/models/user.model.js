import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    phone:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    role:{
        type: String,
        enum: ['user', 'admin', 'teacher'],
        default: 'user',
    }
})

export default mongoose.model('User', userSchema)