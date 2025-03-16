import mongoose, { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";
const movieSchema = new Schema({
  title: { type: String, unique: true, required: true },
  genre: {
    type: String,
    enum: ["Action", "Sci-Fi", "Thriller", "Adventure", "Comedy", "Crime", "Documentary", "Romance", "Drama"],
    required: true,
  },
  rating: { type: Number, default: 0, min: 0, max: 5 },
 releaseDate: { type: String  },
 director: { type: String  },
});

movieSchema.plugin(normalize);

export const Movie = model("movie", movieSchema);
