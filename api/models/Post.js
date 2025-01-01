
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  price: Number,
  images: [String],
  address: String,
  city: String,
  bedroom: Number, // to vietnamese means "phòng ngủ"
  bathroom: Number, // to vietnamese means "phòng tắm"
  latitude: String, // to vietnamese means "vĩ độ"
  longitude: String, // to vietnamese means "kinh độ"
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

const Post = mongoose.model("Post", postSchema);

export default Post;