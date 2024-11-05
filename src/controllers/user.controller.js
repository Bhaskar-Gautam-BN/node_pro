import { user } from "../models/users.model.js";
import jwt from "jsonwebtoken";

export const addNewUser = async (req, res) => {
  const { name, email, password, role, phone, address } = req.body;
  const userExist = await user.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  const newUser = new user({
    name,
    email,
    password,
    role,
    phone,
    address,
  });
  await newUser.save();

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email, role: newUser.role },
    process.env.ACCESS_TOKEN_SECRET, // Secret key
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // Token expiration time
  );

  return res
    .status(201)
    .cookie("auth", token)
    .json({
      message: "User created successfully",
      data: newUser,
      token,
    });
};


export const getAllUserData = async (req, resp) => {
  console.log(req.user.id);
  const users = await user.find().populate("role").select("-password");
  return resp.status(200).json(users);
};