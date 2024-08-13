import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SavedPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: false,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    unique: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { 
    unique: true, 
    index: { userId: 1, postId: 1 } 
  }
);

SavedPostSchema.index({ userId: 1, postId: 1 }, { unique: true });

const SavedPost = model('SavedPost', SavedPostSchema);

export default SavedPost;
