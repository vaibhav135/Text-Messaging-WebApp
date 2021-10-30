import mongoose, { Schema } from "mongoose";

const CreateUserSchema = new Schema({
  user: String,
  description: String,
});

const CreateUser = mongoose.model("users", CreateUserSchema);

export default CreateUser;
