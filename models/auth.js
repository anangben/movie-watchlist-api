import joi from "joi";
import { Schema,model } from "mongoose";
import normalize from "normalize-mongoose";



const authSchema = new Schema({
firstname: {type: String,  required:true},
lastname: {type: String,  required:true},
middlename: {type: String},
email: {type: String,  required:true, unique:true},
password: {type: String,  required:true},
verificationCode:{type: String},
isVerified:{type: Boolean, default: false},
})

authSchema.plugin(normalize);
export const  Auth = model("auth", authSchema)

