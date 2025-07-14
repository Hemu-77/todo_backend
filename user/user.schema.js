import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        
    },
    email : {
        type : String
    },
    password : {
        type : String,
        
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // avoid re-hashing on update
  
    if (!this.password) {
      return next(new Error("Password is missing")); // throw meaningful error
    }
  
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (err) {
      next(err);
    }
  });
  


  export const UserModel = mongoose.model("User", userSchema);