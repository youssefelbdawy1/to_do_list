import Post  from '../models/post.js';
import User  from '../models/User.js';

import asyncwrapper  from '../middlewares/asyncwrapper.js';
import AppError  from '../utils/appError.js';
import httpstatustext  from '../utils/httpstatustext.js';
import paginate  from '../utils/pagination.js';


// ==============================
// CREATE POST
// ==============================
// title/content/date/ID presence + non-empty title/content are validated
// by createPostValidator + validate middleware in postRoutes.js
const createPost = asyncwrapper(async (req, res, next) => {

  const { title, content, date, ID } = req.body;

  const post = await Post.create({ title, content, date, createdBy: req.user.id, ID });

  res.status(201).json({
    status: httpstatustext.SUCCESS,
    data: post
  });

});

// ==============================
// GET ALL POSTS
// ==============================
const getposts = asyncwrapper(async (req, res, next) => {

  const filter = { createdBy: req.user.id };
  const pagination = await paginate(Post, req, filter);
  const posts = await Post.find(filter)
    .sort({ date: 1 })
    .skip(pagination.skip)
    .limit(pagination.limit);

  res.status(200).json({
    status: httpstatustext.SUCCESS,
    page: pagination.page,
    results: posts.length,
    totalPages: pagination.totalPages,
    data: posts
  });

});

// ==============================
// UPDATE POST
// ==============================
const updatePost = asyncwrapper(async (req, res, next) => {

  const { title, content, date } = req.body;

  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    { title, content, date },
    { new: true, runValidators: true }
  );

  // 404 - not found
  if (!post) {
    return next(
      new AppError("Post not found", 404, httpstatustext.FAIL)
    );
  }

  res.status(200).json({
    status: httpstatustext.SUCCESS,
    message: "Post updated successfully",
    data: post
  });

});

// ==============================
// DELETE POST
// ==============================
const deletePost = asyncwrapper(async (req, res, next) => {

  const post = await Post.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });

  // 404 - not found
  if (!post) {
    return next(
      new AppError("Post not found or unauthorized", 404, httpstatustext.FAIL)
    );
  }

  res.status(200).json({
    status: httpstatustext.SUCCESS,
    message: "Post deleted successfully"
  });

});

export  {
  createPost,
  getposts,
  updatePost,
  deletePost
};