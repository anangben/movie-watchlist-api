import { Router } from "express";
import {
  deleteMovie,
  getAllMovies,
  getMovie,
  postMovie,
  updateMovie,
} from "../controllers/movie.js";

//Create movie roues
const movieRouter = Router();

//Define routes

movieRouter.get("/movies/:id", getMovie);
movieRouter.get("/movies", getAllMovies);
movieRouter.post("/movies", postMovie);
movieRouter.patch("/movies/:id", updateMovie);
movieRouter.delete("/movies/:id", deleteMovie);

//export movie route
export default movieRouter;
