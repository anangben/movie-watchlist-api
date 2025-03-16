import bcrypt from "bcrypt";

export const comparePassword = async (password, hashedPassword) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatched;
};


