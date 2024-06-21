import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log("Mongodb connected!"))
  .catch((error) => console.error('Error connecting to Mongodb:', error));

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(8800, ()=>{
    console.log("Server is running");
});