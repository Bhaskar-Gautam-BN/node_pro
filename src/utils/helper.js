
import jwt from "jsonwebtoken"
export  function generateAccessToken(user) {
 return  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
   expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
 });
}

export  function generateRefreshToken(user) {
  return  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
}
