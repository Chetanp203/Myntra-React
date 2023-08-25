import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import { getCurrentUser, login, register } from "./Controllers/User-controller.js";


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json())

app.post("/register", register);
app.post("/login", login);
app.post("/get-current-user", getCurrentUser);


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log("Error while connecting to MongDB",error)
})

app.listen(8002,()=>{
    console.log("Listening from sever 8002")
})