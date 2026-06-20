import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },
  ID:{
    type:String,
    required:true,
    unique:true
  },

  createdAt: Date,

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
},
{ timestamps: true }
);

export default mongoose.model("User", userSchema);