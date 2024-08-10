import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Post from '../models/post.js';

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await Post.find({
      city: query.city || undefined,
      type: query.type || undefined,
      property: query.property || undefined,
      bedroom: parseInt(query.bedroom) || undefined,
      price: {
        $gte: parseInt(query.minPrice) || 0,
        $lte: parseInt(query.maxPrice) || Number.MAX_SAFE_INTEGER,
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id)
      .populate({
        path: 'postDetail',
      })
      .populate({
        path: 'user',
        select: 'username avatar',
      });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
    const token = req.cookies?.token;
    let isSaved = false;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
             isSaved = post.savedPosts.includes(payload.id);  
        //   const saved = await SavedPost.findOne({
        //     userId: payload.id,
        //     postId: id,
        //   });
        }else {
            return res.status(401).json({ message: 'Invalid token' });
          }
      });
      res.status(200).json({ ...post.toObject(), isSaved });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
    const {
        title,
        price,
        images, 
        address,
        city,
        bedroom,
        bathroom,
        type,
        property,
        latitude,
        longitude,
        postDetail, 
      } = req.body;  
      const user = req.userId;
  
  if (!title || !price || !address || !city || !bedroom || !bathroom || !type || !property) {
    return res.status(400).json({ message: "All required fields must be provided." });
  }

//   try {
//     const newPost = await Post.create({
//       ...body.postData,
//       user: tokenUserId,
//       postDetail: body.postDetail,
//     });
try {
    const newPost = await Post.create({
      title,
      price,
      images, 
      address,
      city,
      bedroom,
      bathroom,
      type,
      property,
      latitude, 
      longitude, 
      postDetail, 
      user, 
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    if (post.user.toString() !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    if (post.user.toString() !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
