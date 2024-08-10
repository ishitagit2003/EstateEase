import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PostSchema = new mongoose.Schema({
  title: 
  { 
    type: String, 
    required: true 
  },
  price: 
    {
     type: Number, 
     required: true 
    },
  images: 
  [{ 
    type: String
   }],
  address: 
  {
     type: String, 
     required: true 
  },
  city: 
  {
     type: String,
     required: true 
  },
  bedroom: 
  {
    type: Number, 
    required: true 
  },
  bathroom: 
  {
     type: Number, 
     required: true 
  },
  latitude: String,
  longitude: String,
  type:
   { 
    type: String,
     enum: ['buy', 'rent'], 
     required: true 
    },
  property: 
  {
     type: String, 
     enum: ['apartment', 'house', 'condo', 'land'], 
     required: true 
    },
  createdAt: 
   {
     type: Date, 
     default: Date.now 
    },
  user: 
   {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User',
    },
  postDetail: {
    description: { type: String},
    features: [{ type: String }],
    yearBuilt: { type: Number },
  },
  savedPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'SavedPost',
  }],
});

const Post = model("Post", PostSchema);

export default Post;
