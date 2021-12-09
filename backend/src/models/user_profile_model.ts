import mongoose, { Schema } from "mongoose";

const UserProfileModel = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  createdOn: { type: Date, required: true },
  profile_name: { type: String },
  description: { type: String },
  gender: { type: String },
  image: { type: String },
  hobbies: { type: [String] },
  Social_media: {
    facebook: { type: String },
    instagram: { type: String },
    github: { type: String },
  },
});

const CreateUserProfile = mongoose.model("user profile", UserProfileModel);

export default CreateUserProfile;
