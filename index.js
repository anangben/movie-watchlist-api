import express, { json } from "express";
import movieRouter from "./routes/movie.js";
import mongoose from "mongoose";
import { authRoute } from "./routes/auth.js";
import cors from "cors";

//Establish a database connection
mongoose.connect(process.env.MONGO_URI);

// Create an express app
const app = express();

const port = process.env.PORT || 3000
//Use cors middleware
app.use(cors());

//Use json middleware
app.use(express.json());


// Use route
app.use("/api/v1", movieRouter);
app.use("/api/v1", authRoute)



//Listen to server
app.listen(port, () => {
  console.log(`Server is listening on port 3000`);
});
