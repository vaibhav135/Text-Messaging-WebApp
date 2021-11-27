import mongoose, { Mongoose } from "mongoose";
import CreateGroup from "../models/groups_model";
import CreateUserProfile from "../models/user_profile_model";

type typeGroup = {
  name: String;
  description: String;
  tags: [String];
  CreatedOn: Date;
  admins: [String];
  moderators: [String];
  members: [String];
};

export const getAllGroups = async (req: any, res: any) => {
  try {
    const groups = await CreateGroup.find();
    console.log(groups);
    return res.json({ status: "ok", data: groups });
  } catch (error) {
    return res.json({
      status: "error",
      error: (error as Error).message,
    });
  }
};

export const getOneUserGroup = async (req: any, res: any) => {
  try {
    const groupId = req.params.id;
    const group: typeGroup | any = await CreateGroup.findOne({
      groupId,
    }).lean();
    const memebers_id_list: [String] = group.members;
    let members_data_list = [];
    for (let id of memebers_id_list) {
      const member: any = await CreateUserProfile.findOne({
        id,
      }).lean();
      const data = {
        profile_name: member.profile_name,
        username: member.username,
        gender: member.gender,
        image: member.image,
        social_media: member.social_media,
      };
      members_data_list.push(data);
    }

    return res.json({ status: "ok", data: members_data_list });
  } catch (error) {
    return res.json({
      status: "error",
      error: (error as Error).message,
    });
  }
};

export const getUserGroups = async (req: any, res: any) => {
  const userId = req.params.id;
  try {
    const userGroups = await CreateGroup.find({ members: userId });
    console.log(userGroups);
    return res.json({
      status: "ok",
      data: userGroups,
    });
  } catch (error) {
    return res.json({
      status: "error",
      error: (error as Error).message,
    });
  }
};

export const getUserProfile = async (req: any, res: any) => {
  const id = req.params.id;
  try {
    const profile = await CreateUserProfile.findOne({
      user_id: id,
    }).lean();
    return res.json({ status: "ok", data: profile });
  } catch (error) {
    return res.json({
      status: "error",
      error: (error as Error).message,
    });
  }
};
