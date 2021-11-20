import mongoose, { Schema } from "mongoose";

const CreateGroupSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  tags: { type: [String] },
  createdOn: { type: Date, required: true },
  admins: { type: [Schema.Types.ObjectId], required: true },
  moderators: { type: [Schema.Types.ObjectId] },
  members: { type: [Schema.Types.ObjectId] },
});

const CreateGroup = mongoose.model("groups", CreateGroupSchema);

export default CreateGroup;
