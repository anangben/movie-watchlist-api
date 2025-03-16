import jwt from "jsonwebtoken";

// Load the secret key from environment variables
const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const generateToken = (Auth) => {
    const token = jwt.sign({ email: Auth.email, firstname: Auth.firstname, lastname: Auth.lastname },
        SECRET_KEY,
        { expiresIn: "1h" }
    )
    return token;
}




   