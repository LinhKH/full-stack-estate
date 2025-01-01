import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  seenBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  lastMessage: {
    type: String,
    default: "",
  },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
