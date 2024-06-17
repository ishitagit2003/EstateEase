import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
// import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();

console.log('Database URL:', process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Mongodb connected!"))
  .catch((error) => console.error('Error connecting to Mongodb:', error));


app.use(express.json());

// app.use("/api/auth", authRoute);

app.listen(8800, ()=>{
    console.log("Server is running");
});