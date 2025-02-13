import express from "express"
import dotenv from 'dotenv'

import cors from 'cors'
import cookieParser from "cookie-parser"
import mongodbConnect from "./db/mongodbConnect.js"
import userRouter from "./Routes/userRoute.js"

const app = express()

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
  origin: "https://react-auth-4929.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.get('/',(req,res)=>{
    res.send("hello")
})

app.use('/user',userRouter);

app.listen(process.env.PORT,()=>{
    console.log('server is running');
    mongodbConnect()
}); 
