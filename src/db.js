import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost/AW");
        console.log(">>DB connected");
    }catch(error){
        console.log(error);
    }
}