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
    "your-secret-key", // Secret key
    { expiresIn: "1h" } // Token expiration time
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
  const users = await user.find().populate("role");
  return resp.status(200).json(users);
};