import mongoose, { Mongoose } from "mongoose";
import express from "express";
import bcrypt from "bcrypt";
import CreateUser from "../models/create_user";
import CreateGroup from "../models/groups_model";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const router = express.Router();

const JWT_TOKEN = process.env.JWT_TOKEN ?? "";

type userType = {
  username: string;
  password: string;
  _id: string;
};

//Registration middleware
export const addUser = async (req: any, res: any) => {
  const { username, password: plainTextPassword } = req.body;

  if (username === "guest") {
    console.log("user cannot be guest");
    return res.json({
      status: "error",
      error: "username cannot be set to guest",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  console.log(plainTextPassword + "\n" + password);

  try {
    const response = await CreateUser.create({
      username,
      password,
    });
    console.log("User created successfully: ", response);
  } catch (error: any) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }

  res.json({ status: "ok" });
};

//Login middleware
export const loginUser = async (req: any, res: any) => {
  const { username, password } = req.body;
  const user: userType = await CreateUser.findOne({ username }).lean();
  if (!user) {
    return res.json({
      status: "error",
      auth: false,
      error: "Invalid username/password",
    });
  }

  if (await bcrypt.compare(password, user.password)) {
    // the username, password combination is successful

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      JWT_TOKEN
    );

    return res.json({
      id: user._id,
      username: user.username,
      auth: true,
      data: token,
      status: "ok",
    });
  }

  res.json({
    status: "error",
    auth: false,
    error: "Invalid username/password",
  });
};

export const createGroup = async (req: any, res: any) => {
  const { name, description, tags, createdOn, admins, moderators, members } =
    req.body;
  //const token = req.headers["x-access-token"];
  //console.log(token);
  //VerifyToken(token);

  const newGroup = new CreateGroup({
    name,
    description,
    tags,
    createdOn,
    admins,
    moderators,
    members,
  });
  try {
    await newGroup.save();
    return res.json({ status: "ok" });
  } catch (error) {
    res.json({
      status: "error",
      error: (error as Error).message,
    });
  }
};
//export const getUsers = async (req: any, res: any) => {
//try {
//const users = await CreateUser.find();
//res.status(200).json(users);
//} catch (error) {
//res.status(404).json({ message: (error as Error).message });
//}
//};

//export const createUser = async (req: any, res: any) => {
//const { user, description } = req.body;
//const newUser = new CreateUser({ user, description });
//try {
//await newUser.save();
//res.status(200).json(newUser);
//} catch (error) {
//res.status(404).json({ message: (error as Error).message });
//}
//};

//export const getSpecificUser = async (req: any, res: any) => {
//const userId = req.params.id;
////const { id } = req.params;
////console.log(userId);
////console.log(typeof id);
//try {
//const user = await CreateUser.findById(userId);
//res.status(200).json(user);
//} catch (error) {
//res.status(404).send(`error occured: ${(error as Error).message}`);
//}
//};

//export const deleteUser = async (req: any, res: any) => {
//const userId = req.params.id;
//try {
//const user = await CreateUser.findByIdAndRemove(userId);
//res.status(200).json(user);
//} catch (error) {
//res.status(404).send(`error occured: ${(error as Error).message}`);
//}
//};

//export const updateUser = async (req: any, res: any) => {
//const userId = req.params.id;
//const updateData = req.body;

//if (!mongoose.Types.ObjectId.isValid(userId)) {
//return res.status(404).send("user not foutd");
//}

////const user = await CreateUser.findById(userId);
//const update_user = await CreateUser.findByIdAndUpdate(userId, updateData);
//res.status(200).json(update_user);
//};

export default router;
