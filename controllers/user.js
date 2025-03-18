import { User } from "../models/user.js";
import { registerValidator } from "../validators/user.js";
import { loginValidator } from "../validators/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register controller
export const register = async (req, res, next) => {
  try {
    //Validate register information
    const { error, value } = registerValidator.validate(req.body, {
      abortEarly: false,
    });

    // Check if email already exists
    const existingUser = await User.findOne({
      $or: [{ username: value.username }, { email: value.email }],
    });
    if (existingUser) {
      return res.status(409).json("User already exists!");
    }

    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(value.password, 12);

    // Replace the plain text password with the hashed password
    value.password = hashedPassword;

    //Save the validated register information in database
    const user = await User.create(value);
    if (error) {
      return res.status(422).json(error.details[0].message);
    }
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

//Login controller
export const login = async (req, res) => {
  try {
    // Validate Login information
    const { error, value } = loginValidator.validate(req.body);

    if (error) {
      return res.status(422).json({ errors: error.details[0].message });
    }

    // Find user by email
    const user = await User.findOne({
      $or: [{ username: value.username }, { email: value.email }],
    });
    if (!user) {
      return res.status(409).json("User does not exists!");
    }

    // Compare the provided password with the stored hashed password
    const comparePassword = await bcrypt.compare(value.password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //User access token generation
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
