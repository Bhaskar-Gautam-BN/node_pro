import { user } from "../models/users.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/helper.js";

export const userSignIn = async (req, resp) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return resp
      .status(400)
      .json({ message: "Please provide email and password" });
  }
  const userData = await user.findOne({ email });

  if (!userData) {
    return resp.status(401).json({ message: "Invalid email or password" });
  }
  if (password !== userData.password) {
    return resp.status(401).json({ message: "Invalid password" });
  }
  const accessToken = generateAccessToken({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  });
  const refreshToken = generateRefreshToken({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  });
  return resp
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    })
    .json({ accessToken, refreshToken });
};

export const protectedRouteWithAuth = async (req, res) => {
  //   console.log(res);
  try {
    // `req.user` should now contain the authenticated user's data
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving user details" });
  }
};
