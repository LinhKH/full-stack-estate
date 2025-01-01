import mongoose from "mongoose";

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

// Create a compound index to enforce uniqueness on the combination of user and post
savedPostSchema.index({ user: 1, post: 1 }, { unique: true });

const SavedPost = mongoose.model("SavedPost", savedPostSchema);

export default SavedPost;
