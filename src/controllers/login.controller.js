import { user } from "../models/users.model.js";
import jwt from "jsonwebtoken";
// Assuming you're using bcrypt for password hashing

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const userData = await user.findOne({ email });
  console.log(userData.password);
  if (!userData) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  if (password !== userData.password) {
    return res.status(401).json({ message: "Invalid password" });
  }
  // Generate JWT token
  const token = jwt.sign(
    { id: userData._id, email: userData.email, role: userData.role },
    process.env.ACCESS_TOKEN_SECRET, // Secret key
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // Token expiration time
  );

  // Set the token as an HTTP-only cookie
  return res
    .status(200)
    .cookie("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Send cookie over HTTPS in production
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      sameSite: "strict",
    })
    .json({
      message: "Login successful",
      data: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
      token,
    });
};
