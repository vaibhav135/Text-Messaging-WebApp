import express from "express";
import CreateGroup from "../models/groups_model";

export const deleteMember = async (req: any, res: any) => {
  const { groupId, user_id } = req.body;
  try {
    await CreateGroup.update({ _id: groupId }, { $pull: { members: user_id } });
    const updatedMembersArray = await CreateGroup.find({ _id: groupId });
    return res.json({ status: "ok", data: updatedMembersArray });
  } catch (error) {
    console.log((error as Error).message);
    return res.json({ status: "error", error: (error as Error).message });
  }
};

export const deleteModerator = async (req: any, res: any) => {
  const { groupId, user_id } = req.body;
  try {
    await CreateGroup.update(
      { _id: groupId },
      { $pull: { moderators: user_id } }
    );
    const updatedModeratorsArray = await CreateGroup.find({ _id: groupId });
    return res.json({ status: "ok", data: updatedModeratorsArray });
  } catch (error) {
    console.log((error as Error).message);
    return res.json({ status: "error", error: (error as Error).message });
  }
};

export const deleteGroup = async (req: any, res: any) => {
  const { groupId, user_id } = req.body;
  try {
    const updatedGroupsArray = await CreateGroup.findOne({ _id: groupId });
    for (admin of updatedGroupsArray.admins) {
      if (user_id === admin) {
        await CreateGroup.update(
          { _id: groupId },
          { $pull: { moderators: user_id } }
        );
        const updatedGroupsArray = await CreateGroup.find();
        return res.json({ status: "ok", data: updatedGroupsArray });
      }
      return res.json({
        status: "error",
        error: "You don't have the authority to delete this group",
      });
    }
  } catch (error) {
    console.log((error as Error).message);
    return res.json({ status: "error", error: (error as Error).message });
  }
};
