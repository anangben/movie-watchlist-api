import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

userSchema.plugin(normalize);
export const User = model("user", userSchema);
