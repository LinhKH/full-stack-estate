import mongoose from "mongoose";

const postDetailSchema = new mongoose.Schema({
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

const PostDetail = mongoose.model("PostDetail", postDetailSchema);

export default PostDetail;