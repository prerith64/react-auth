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
app.use(cors({origin:'https://react-auth-4929.vercel.app',credentials:true}))
app.use(cookieParser())
app.options("*", cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((req, res, next) => {
  req.setTimeout(15000); // Set timeout to 15 seconds
  next();
});


app.get('/',(req,res)=>{
    res.send("hello")
})

app.use('/user',userRouter);

app.listen(process.env.PORT,()=>{
    console.log('server is running');
    mongodbConnect()
});



