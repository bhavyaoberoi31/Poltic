import mongoose from "mongoose";
import Reels from "../model/Reels.js";
import Report from "../model/Report.js";

import dotenv from "dotenv";
import ImageKit from "imagekit";

dotenv.config();

const serverUrl = process.env.SERVER_URL || "http://localhost:5000";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const createReel = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    const videoFile = req.files.video?.[0];
    const thumbnailFile = req.files.thumbnail?.[0];

    if (!videoFile) {
      return res.status(400).json({ message: "Video file is required" });
    }

    // Upload video to ImageKit
    const videoUpload = await imagekit.upload({
      file: videoFile.buffer,
      fileName: videoFile.originalname,
      folder: "/reels/videos",
    });

    let thumbnailUrl = "";
    if (thumbnailFile) {
      const thumbUpload = await imagekit.upload({
        file: thumbnailFile.buffer,
        fileName: thumbnailFile.originalname,
        folder: "/reels/thumbnails",
      });
      thumbnailUrl = thumbUpload.url;
    }

    const reel = new Reels({
      video: videoUpload.url,
      title,
      description,
      thumbnail: thumbnailUrl,
      userId,
    });

    await reel.save();
    res.status(201).json(reel);
  } catch (error) {
    console.error("Error in creating reel.", error);
    res.status(500).json({ message: "Error creating reel", error: error.message });
  }
};


export const deleteReelById = async (req, res) => {
  try {
    const id = req.query.id;
    // Find and delete the reel
    const reel = await Reels.findByIdAndDelete(id);

    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }
    res.status(200).json({ message: "Reel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reel", error: error.message });
  }
};

// Update a reel by ID
export const updateReelById = async (req, res) => {
  try {
    const id = req.query.id;
    const updates = req.body;
    // Find and update the reel
    const reel = await Reels.findByIdAndUpdate(id, updates, { new: true });
    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }
    res.status(200).json({ message: "Reel updated successfully", reel });
  } catch (error) {
    res.status(500).json({ message: "Error updating reel", error: error.message });
  }
};

export const getAllReels = async (req, res) => {
  try {
    const userId = req.query.userId;

    let reels = await Reels.aggregate([
      { $match: { isDown: false } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          "user.password": 0, // Exclude the password field
        }
      },
      { $sort: { createdAt: -1 } } // Correct field name
    ]);

    res.status(200).json(reels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getReelsByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;
    const reels = await Reels.aggregate([
      { $match: { isDown: false, userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          'user.password': 0,
        }
      }
    ])
    if (!reels.length) {
      return res.status(404).json({ message: "No reels found for this user" });
    }
    res.status(200).json(reels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a reel by ID
export const getReelById = async (req, res) => {
  try {
    const id = req.query.id;

    const reel = await Reels.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id), isDown: false } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          "user.password": 0,
        }
      }
    ]);

    if (!reel.length) {
      return res.status(404).json({ message: "Reel not found" });
    }

    res.status(200).json(reel[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reel", error: error.message });
  }
};


