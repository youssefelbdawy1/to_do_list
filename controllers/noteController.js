import Note  from '../models/Note.js';
import User  from '../models/User.js';

import asyncwrapper  from '../middlewares/asyncwrapper.js';
import AppError  from '../utils/appError.js';
import httpstatustext  from '../utils/httpstatustext.js';
import paginate  from '../utils/pagination.js';


// ==============================
// CREATE NOTE
// ==============================
const createNote = asyncwrapper(async (req, res, next) => {
  
  const { title, description, date } = req.body;
  const note = await Note.create({ title, description, date, createdBy: req.user.id });
  
    res.status(201).json({
      status: httpstatustext.SUCCESS,
      data: note
    });

});

// ==============================
// GET ALL NOTES
// ==============================
const getNotes = asyncwrapper(async (req, res, next) => {

  const filter = { createdBy: req.user.id };
  const pagination = await paginate(Note, req, filter);
  const notes = await Note.find(filter)
  .sort({ date: 1 })
  .skip(pagination.skip)
  .limit(pagination.limit);

  res.status(200).json({
    status: httpstatustext.SUCCESS,
    page: pagination.page,
    results: notes.length,
    totalPages: pagination.totalPages,
    data: notes
  });

});

// ==============================
// GET SINGLE NOTE
// ==============================
const getNote = asyncwrapper(async (req, res, next) => {

  const note = await Note.findById({ _id: req.params.id, createdBy: req.user.id });

  if (!note) {
    return next(
      new AppError("Note not found or unauthorized", 404, httpstatustext.FAIL)
    );
  }

  res.status(200).json({
    status: httpstatustext.SUCCESS,
    data: note
  });

});

// ==============================
// UPDATE NOTE
// ==============================
const updateNote = asyncwrapper(async (req, res, next) => {

  const { title, description, date } = req.body;

  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    { title, description, date },
    { new: true, runValidators: true }
  );

  if (!note) {
    return next(
      new AppError("Note not found or unauthorized", 404, httpstatustext.FAIL)
    );
  }

  res.status(200).json({
    status: httpstatustext.SUCCESS,
    message: "Note updated successfully",
    data: note
  });

});

// ==============================
// DELETE NOTE
// ==============================
const deleteNote = asyncwrapper(async (req, res, next) => {

  const note = await Note.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });

  if (!note) {
    return next(
      new AppError("Note not found or unauthorized", 404, httpstatustext.FAIL)
    );
  }

  res.status(200).json({
    status: httpstatustext.SUCCESS,
    message: "Note deleted successfully"
  });

});

export  {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote
};