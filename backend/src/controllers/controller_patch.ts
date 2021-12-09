import express from "express";
import { Mongoose, Schema } from "mongoose";

// models
import CreateGroup from "../models/groups_model";
import CreateUserProfile from "../models/user_profile_model";

export const updateUserProfile = async (req: any, res: any) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);
  try {
    const profile = await CreateUserProfile.updateOne({ user_id: id }, data);
    const doc = await CreateUserProfile.findOne({ user_id: id });
    console.log(doc);
    return res.json({ status: "ok", data: doc });
  } catch (error) {
    console.log((error as Error).message);
    return res.json({ status: "error", error: (error as Error).message });
  }
};

export const updateGroupMember = async (req: any, res: any) => {
  const { groupId, user_id } = req.body;
  try {
    await CreateGroup.update({ _id: groupId }, { $push: { members: user_id } });
    const updatedMembersArray = await CreateGroup.find({ _id: groupId });
    return res.json({ status: "ok", data: updatedMembersArray });
  } catch (error) {
    console.log((error as Error).message);
    return res.json({ status: "error", error: (error as Error).message });
  }
};
