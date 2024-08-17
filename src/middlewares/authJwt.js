import jwt from "jsonwebtoken";

export const jwtVerifyToken = (req, resp, next) => {
  const token = req.cookies.auth;
  console.log(token);
  if (!token) return resp.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token,"your-secret-key", {
      expiresIn: "1d",
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
