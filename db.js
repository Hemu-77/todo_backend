import mongoose from "mongoose";


//const baseUrl = process.env.MONGODB || "0.0.0.0:27017";

export const connectDB = async() => {
  try{
    await mongoose.connect(`mongodb://localhost:27017/todo-app`);
    console.log("MONGODB connected using mongoose");
    
  }catch(err){
    console.log(err);
    
  }
}