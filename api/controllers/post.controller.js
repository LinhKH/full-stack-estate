import Post from "../models/Post.js";
import SavedPost from "../models/SavedPost.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const filter = {
      ...(query.city && { city: query.city }),
      ...(query.type && { type: query.type }),
      ...(query.property && { property: query.property }),
      ...(query.bedroom && { bedroom: parseInt(query.bedroom) }),
      price: {
        ...(query.minPrice && { $gte: parseInt(query.minPrice) }),
        ...(query.maxPrice && { $lte: parseInt(query.maxPrice) }),
      },
    };

    const posts = await Post.find(filter);

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id)
      .populate("postDetail")
      .populate("user", "username avatar");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await SavedPost.findOne({
            userId: payload.id,
            postId: id,
          });
          return res
            .status(200)
            .json({ ...post.toObject(), isSaved: saved ? true : false });
        } else {
          return res.status(200).json({ ...post.toObject(), isSaved: false });
        }
      });
    } else {
      return res.status(200).json({ ...post.toObject(), isSaved: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = new Post({
      ...body.postData,
      userId: tokenUserId,
      postDetail: body.postDetail,
    });

    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
