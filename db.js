import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_LINK);
            console.log('connect to db');
            
    }catch(err){
        console.log("err:",err.message);
        process.exit(1);
    }
}
export default connectDB;