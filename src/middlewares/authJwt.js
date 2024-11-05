import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/helper.js";

export const jwtVerifyToken = (req, resp, next) => {
  const token = req.cookies.auth;
  if (!token) return resp.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return resp
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }
    return resp.status(400).json({ message: "Invalid token." });
  }
};

export async function authToken(req, res, next) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refToken;
  
  if (!accessToken) {
    if (refreshToken) {
      req.cookies.accessToken = refreshToken; // Send refreshToken as new accessToken
      next();
    } else {
      return res.status(401).send("Access denied. Please log in again.");
    }
  } else {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token expired. Please log in again." });
      }
      return res.status(400).json({ message: "Invalid token." });
    }
  }
}
