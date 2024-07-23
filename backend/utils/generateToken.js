import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt-netflix", token, {
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days in miliseconds
    httpOnly: true, // prevent XSS attacks cross site scripting attacks, make it unaccessible from frontend
    secure: true,
    sameSite: "strict", // prevent CSRF
  });

  return token;
};
