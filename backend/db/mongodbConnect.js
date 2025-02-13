import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
  export default function mongodbConnect(){
    mongoose.connect(process.env.MONGODB)
.then(()=>console.log("Mongodb connected"))
.catch(err => console.log(err));
}
