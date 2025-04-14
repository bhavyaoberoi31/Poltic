import Follow from "../model/Folow.js";

// Create a follow
export const createFollow = async (req, res) => {
  try {
    const { creatorId, userId } = req.body;

    if (!creatorId || !userId) {
      return res.status(400).json({ message: "CreatorId and UserId are required." });
    }

    const follow = new Follow({ creatorId, userId });
    await follow.save();

    res.status(201).json({ message: "Follow created successfully.", follow });
  } catch (error) {
    res.status(500).json({ message: "Error creating follow.", error });
  }
};

// Get follows by userId
export const getFollowsByUserId = async (req, res) => {
  try {
    const userId  = req.query.userId;
    const follows = await Follow.find({ userId }).populate('creatorId', 'name email');

    res.status(200).json({ follows });
  } catch (error) {
    res.status(500).json({ message: "Error fetching follows by userId.", error });
  }
};

// Get follows by creatorId
// export const getFollowsByCreatorId = async (req, res) => {
//   try {
//     const { creatorId } = req.params;
//     const follows = await Follow.find({ creatorId }).populate('userId', 'name email');

//     res.status(200).json({ follows });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching follows by creatorId.", error });
//   }
// };

// Delete a follow
export const deleteFollow = async (req, res) => {
  try {
    const id  = req.query.id;
    const follow = await Follow.findByIdAndDelete(id);
    if (!follow) {
      return res.status(404).json({ message: "Follow not found." });
    }
    res.status(200).json({ message: "Follow deleted successfully.", follow });
  } catch (error) {
    res.status(500).json({ message: "Error deleting follow.", error });
  }
};

// Get follow count by userId
export const getFollowCountByUserId = async (req, res) => {
  try {
    const creatorid  = req.query.creatorid;
    const count = await Follow.countDocuments({ creatorid });

    res.status(200).json({ creatorid, followCount: count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching follow count.", error });
  }
};

// Check if the user has followed the creator
export const isFollowed = async (req, res) => {
  try {
    const { creatorId, userId } = req.body;

    if (!creatorId || !userId) {
      return res.status(400).json({ message: "CreatorId and UserId are required." });
    }

    // Check if the follow relationship exists
    const follow = await Follow.findOne({ creatorId, userId });

    if (follow) {
      return res.status(200).json({ isFollowed: true });
    } else {
      return res.status(200).json({ isFollowed: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error checking follow status.", error });
  }
};
