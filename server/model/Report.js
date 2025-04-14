import mongoose from "mongoose";
const schema = mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reelId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Reels',
    required: true
  }
}, { timestamps: true })

const Report = mongoose.model('Report', schema);
export default Report;