const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Post = require('../models/Post');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email');
    res.status(200).json({
      success: true,
      message: 'Posts fetched successfully',
      data: posts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch posts', error: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, tags, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const post = await Post.create({
      title,
      content,
      tags,
      image,
      author: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create post', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Post fetched successfully',
      data: post
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch post', error: error.message });
  }
});

module.exports = router;
