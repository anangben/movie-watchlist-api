import express, { json } from "express";
import movieRouter from "./routes/movie.js";
import mongoose from "mongoose";
import { userRoute } from "./routes/user.js";
import cors from "cors";

//Establish a database connection
mongoose.connect(process.env.MONGO_URI);

// Create an express app
const app = express();

const port = process.env.PORT || 3000;
//Use cors middleware
app.use(cors());

//Use json middleware
app.use(express.json());

// Use routes
app.use("/api/v1", movieRouter);
app.use("/api/v1", userRoute);

//Listen to server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
