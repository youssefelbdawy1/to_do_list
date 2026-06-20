import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createPost, getposts, updatePost, deletePost } from '../controllers/postController.js';
import { createPostValidator, updatePostValidator } from '../middlewares/validators.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

router.post('/', protect, createPostValidator, validate, createPost);
router.put('/:id', protect, updatePostValidator, validate, updatePost);
router.delete('/:id', protect, deletePost);
router.get('/', protect, getposts);

export default router;