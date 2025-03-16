
import Joi from "joi";
import {Auth}  from "../models/auth.js"
import { registerValidator } from "../validators/auth.js";
import { loginValidator } from "../validators/auth.js";
import { emailValidator } from "../validators/auth.js";
import { verifyUserValidator } from "../validators/auth.js";
import hashPassword from "../utils/hashedPassword.js";
import {comparePassword} from "../utils/comparePassword.js";
import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateCode } from "../utils/generateCode.js";



//Register controller
export const register = async (req, res, next) => {
    try {
        //Validate register information
        const { error, value } = registerValidator.validate(req.body,{ abortEarly: false });
        
        // Check if email already exists
    const existingUser = await Auth.findOne({ email: value.email });
    if (existingUser) {
      return res.status(400).json({ errors: [{ message: 'Email already exists' }] });
    }

        // Hash the password before saving
        const hashedPassword = await hashPassword(value.password);

        // Replace the plain text password with the hashed password
    value.password = hashedPassword;

        //Save register information in database
        const user = await Auth.create(value);
        if (error) {
            return res.status(422).json(error.details);
        }
        res.status(200).json({ message: "Registered successfully", "Register Details": user });
    } catch (error) {
        next(error);
    }
};


//Login controller
export const login = async (req, res, next) => {
    try {
        // Validate Login information
        const { error, value } = loginValidator.validate(req.body, { abortEarly: false });
    
        if (error) {
          return res.status(422).json({ errors: error.details });
        }
    
         // Extract email and password from validated data
        const { email, password } = value;

        // Find user by email
        const user = await Auth.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
    
        // Compare the provided password with the stored hashed password
        const isPasswordMatched = await comparePassword(password, user.password);
        if (!isPasswordMatched) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = generateToken(Auth)
        res.status(200).json({ message: "Login successful", data: {token}});
      } catch (error) {
        next(error);
      }
};


//VerifyCode controller
export const verifyCode = async (req, res, next) => {
    try {
        const { error, value } = emailValidator.validate(req.body, { abortEarly: false });
        if (error) {
          return res.status(422).json({ errors: error.details });
        }
        const { email } = value;
        const user = await Auth.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        if(user.isVerified === true){
            return res.status(400).json({ message: "User already verified" });
        }
        const code = generateCode(6);
       // Update the user's verification code
        user.verificationCode = code;
        await user.save();

        //Send email 
        await  sendEmail({email: user.email, subject: "Email verifiction code", code});

        //Send email with verification code
        res.status(200).json({code:200, status:true, message: "User verification code sent successfully" });
    } catch (error) {
        next(error);
    }
};
 
//VerifyUser controller
export const verifyUser = async (req, res, next) => {
  try {
      const { error, value } = verifyUserValidator.validate(req.body, { abortEarly: false });
      if (error) {
          return res.status(422).json({ errors: error.details });
        }
        const { email, code } = value;
          const user = await Auth.findOne({ email });
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          if(user.isVerified === true){
              return res.status(400).json({ message: "User already verified" });
          }

          if (user.verificationCode !== code) {
            return res.status(400).json({ message: "Invalid verification code" });
          }

          if(user.verificationCode === code){
              user.isVerified = true;
              await user.save();
              res.status(200).json({code:200, status:true, message: "User verified successfully" });
  }
  } catch (error) {
    next(error)
  }
 }

 