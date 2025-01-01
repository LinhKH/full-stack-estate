import mongoose from 'mongoose';

const messageSchema = new Schema({
  text: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;