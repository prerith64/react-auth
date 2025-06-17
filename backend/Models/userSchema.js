import mongoose from "mongoose";

const userSchema= await mongoose.Schema({
  username:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  texts:[{type:String}],
})

const userModel = await mongoose.model("logers",userSchema);

export default userModel
