import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  description: { type: String, required: false},
  thumbnailUrl: { type: String, required: false },
  isReported: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
