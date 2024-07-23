import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-netflix"];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized - NO Token Provided" });
    }

    const decode = jwt.verify(token, ENV_VARS.JWT_SECRET);
    if (!decode) {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized - Invalid User",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};
