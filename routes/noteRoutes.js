import express from 'express' ;
import { protect } from '../middlewares/authMiddleware.js';
import { createNote, getNotes,getNote,updateNote, deleteNote} from '../controllers/noteController.js';

const router = express.Router();

router.post('/', protect,  createNote);
router.patch('/:id', protect,  updateNote);
router.delete('/:id', protect,  deleteNote);
router.get('/:id', protect, getNote);
router.get('/', protect, getNotes);

export default router;


  