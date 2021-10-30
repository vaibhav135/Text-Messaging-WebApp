import mongoose, { Schema } from "mongoose";

const TempSchema = new mongoose.Schema({
  Sender: {
    sender_id: Schema.Types.ObjectId,
    message: String,
    reciepient_id: Schema.Types.ObjectId,
  },
});

const TempSenderModel = mongoose.model("temp sender model", TempSchema);

export default TempSenderModel;
