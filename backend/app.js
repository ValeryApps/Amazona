import express from "express";
import cors from 'cors'
import mogoose from 'mongoose'
import dotenv from 'dotenv'
import { seedRouter } from "./routes/seedRouter.js";
import { productRouter } from "./routes/productRouter.js";
import { userRouter } from "./routes/userRouter.js";
// import {seedRouter} from './routes/seedRouter'

dotenv.config();
mogoose.connect(process.env.MONGODB_URI).then(()=>console.log("connected successfully")).catch(err=>console.log(err.message))
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/api/seed', seedRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

app.use((err,req,res,next)=>{
   return res.status(500).json({message:err.message})
})

const port = 5000;
app.listen(port, () => console.log("We are listening on port ", port))