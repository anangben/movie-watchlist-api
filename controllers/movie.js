import { Movie } from "../models/movie.js";
import { addMovieValidator } from "../validators/movie.js";
//Add movie controller
export const postMovie = async (req, res, next) => {
  //Validate the request body of the movie
  try {
    const { error, value } = addMovieValidator.validate(req.body);
    //Save movie information in database
    const addmovie = await Movie.create(value);
    if (error) {
      return res.status(422).json(error);
    }
    //return response
    res
      .status(201)
      .json({ message: "Movie added successfully", movie: addmovie });
  } catch (error) {
    next(error);
  }
};

//Get all movies  controller
export const getAllMovies = async (req, res, next) => {
  try {
  //Fetch all movies from the database
    const allMovies = await Movie.find();
    res
      .status(200)
      .json({ message: "All movies fetched successfully", movie: allMovies });
  } catch (error) {
    next(error);
  }
};

//Get a specific movie by ID controller
export const getMovie = async (req, res, next) => {
  //Validate the id input field of the movie
  try {
    //Fetch a specific movie from the database
    const singleMovie = await Movie.findById(req.params.id);

    if (!singleMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    //return response
    res
      .status(200)
      .json({ message: "Movie fetched successfully", movie: singleMovie });
  } catch (error) {
    next(error);
  }
};



//Update movie controller
export const updateMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    // Find the book by its ID and update it with the new data from the request body
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { ...req.body },
      {
        new: true,
      }
    );
    //return response
    res.status(200).json({
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    next(error);
  }
};

//Delete movie controller
export const deleteMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    // Find the movie by its ID and delete it from the database
    await Movie.findByIdAndDelete(req.params.id);
    //return response
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    next(error);
  }
};
