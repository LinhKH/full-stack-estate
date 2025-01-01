// import prisma from "../lib/prisma.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await Chat.find({
      users: tokenUserId,
    }).populate("users", "id username avatar");

    const formattedChats = chats.map((chat) => {
      const receiver = chat.users.find((user) => user._id.toString() !== tokenUserId);
      return {
        ...chat.toObject(),
        receiver,
      };
    });

    res.status(200).json(formattedChats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      users: tokenUserId,
    }).populate({
      path: "messages",
      options: { sort: { createdAt: "asc" } },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    // Update the seenBy field
    if (!chat.seenBy.includes(tokenUserId)) {
      chat.seenBy.push(tokenUserId);
      await chat.save();
    }

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const { receiverId } = req.body;

  try {
    const newChat = new Chat({
      users: [tokenUserId, receiverId],
    });

    await newChat.save();

    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await Chat.findOneAndUpdate(
      {
        _id: req.params.id,
        users: tokenUserId,
      },
      {
        $addToSet: { seenBy: tokenUserId },
      },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};
