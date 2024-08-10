import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: 
    {
         type: String, 
         required: true, 
         unique: true 
    },
    username:
    { 
        type: String, 
        required: true,
        unique: true 
    },
    password: 
    {
         type: String,
         required: true 
    },
    avatar: String,
    createdAt: 
    { 
        type: Date,
        default: Date.now 
    },
    posts: 
    [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Post' 
    }],
    savedPosts: 
    [{
         type: Schema.Types.ObjectId, 
         ref: 'SavedPost' 
    }],
    chatIDs: 
    [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Chat' 
    }]
  });
  
const User = model("User", userSchema);

export default User;
