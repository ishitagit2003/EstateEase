import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
// import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log("Mongodb connected!"))
  .catch((error) => console.error('Error connecting to Mongodb:', error));

  app.use(cors({ origin: process.env.DATABASE_URL, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());
  

app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);

app.listen(8800, ()=>{
    console.log("Server is running");
});