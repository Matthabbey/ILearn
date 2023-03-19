import Joi from "joi";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthPayload } from "../interface/auth.dto";
import { APP_SECRET } from "../Config";

export const registerSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  userType: Joi.string().required(),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const option = {
  abortEarly:
    false /* means if there's an error in the first keys, it'll takecare of the error 
                              first before moving on to the next error  */,
  errors: {
    wrap: { label: "" },
  },
};

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const GenerateSignature = async (payload: AuthPayload) => {
  try {
    return jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
  } catch (error) {
    throw "could not create a token";
  } /*1d means 1 day */
};

export const verifySignature = async (signature: string) => {
  return jwt.verify(signature, APP_SECRET) as JwtPayload;
};

export const validatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};

//schema for reset Password
export const forgotPasswordSchema = Joi.object().keys({
  email: Joi.string().required(),
});
export const resetPasswordSchema = Joi.object().keys({
  password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
  //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({
      "any.only": "passwords does not match",
      "any.required": "You need to add a confirm password",
    }),
});
