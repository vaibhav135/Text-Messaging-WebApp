import mongoose, { Mongoose } from "mongoose";
import express from "express";

import CreateUser from "../models/create_user_db";

const router = express.Router();

export const getUsers = async (req: any, res: any) => {
  try {
    const users = await CreateUser.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};

export const createUser = async (req: any, res: any) => {
  const { user, description } = req.body;
  const newUser = new CreateUser({ user, description });
  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};

export const getSpecificUser = async (req: any, res: any) => {
  const userId = req.params.id;
  //const { id } = req.params;
  //console.log(userId);
  //console.log(typeof id);
  try {
    const user = await CreateUser.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send(`error occured: ${(error as Error).message}`);
  }
};

export const deleteUser = async (req: any, res: any) => {
  const userId = req.params.id;
  try {
    const user = await CreateUser.findByIdAndRemove(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send(`error occured: ${(error as Error).message}`);
  }
};

export const updateUser = async (req: any, res: any) => {
  const userId = req.params.id;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send("user not foutd");
  }

  //const user = await CreateUser.findById(userId);
  const update_user = await CreateUser.findByIdAndUpdate(userId, updateData);
  res.status(200).json(update_user);
};

export default router;
