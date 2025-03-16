import Joi from "joi";

export const addMovieValidator = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  rating: Joi.number(),
  releaseDate: Joi.string(),
  director: Joi.string()
});
