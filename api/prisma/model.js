const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  price: Number,
  images: [String],
  address: String,
  city: String,
  bedroom: Number,
  bathroom: Number,
  latitude: String,
  longitude: String,
  type: {
    type: String,
    enum: ["buy", "rent"],
  },
  property: {
    type: String,
    enum: ["apartment", "house", "condo", "land"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postDetail: {
    type: Schema.Types.ObjectId,
    ref: "PostDetail",
  },
  savedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "SavedPost",
    },
  ],
});

const postDetailSchema = new Schema({
  desc: String,
  utilities: String,
  pet: String,
  income: String,
  size: Number,
  school: Number,
  bus: Number,
  restaurant: Number,
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    unique: true,
  },
});

const savedPostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    unique: [["user", "post"]],
  }
);

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  savedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "SavedPost",
    },
  ],
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
});

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
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  lastMessage: String,
});

const messageSchema = new Schema({
  text: String,
  userId: String,
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);
const PostDetail = mongoose.model("PostDetail", postDetailSchema);
const SavedPost = mongoose.model("SavedPost", savedPostSchema);
const User = mongoose.model("User", userSchema);
const Chat = mongoose.model("Chat", chatSchema);
const Message = mongoose.model("Message", messageSchema);

module.exports = {
  Post,
  PostDetail,
  SavedPost,
  User,
  Chat,
  Message,
};
