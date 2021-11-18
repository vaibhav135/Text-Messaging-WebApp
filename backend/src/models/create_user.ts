import mongoose, { Schema } from "mongoose";

const CreateUserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const CreateUser = mongoose.model("users", CreateUserSchema);

export default CreateUser;
