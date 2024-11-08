import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>console.log(">>DB connected"));
    }catch(error){
        console.log(error);
    }
}