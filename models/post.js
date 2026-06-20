import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  createdAt: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ID:{
    type:String,
    required:true,
    unique:true
  }
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
