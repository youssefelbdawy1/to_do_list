import User  from'../models/User.js';

import bcrypt from 'bcrypt';
import jwt  from'jsonwebtoken';

import asyncwrapper  from'../middlewares/asyncwrapper.js';
import AppError  from'../utils/appError.js';
import httpstatustext  from'../utils/httpstatustext.js';


// =============================
// Generate Token
// =============================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};


// =============================
// REGISTER
// =============================
const register = asyncwrapper(async (req, res, next) => {

  const avatar = req.file ? req.file.path : null;
  const {
    name,
    email,
    password,
  } = req.body;

  if (!name || !email || !password) {
    return next(
      new AppError("Data are required", 400, httpstatustext.FAIL)
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(
      new AppError("Email already exists", 400, httpstatustext.FAIL)
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar
  });

  res.status(201).json({
    status: httpstatustext.SUCCESS,
    message: "Student registered successfully",
    email: user.email
  });

});


// =============================
// LOGIN
// =============================
const login = asyncwrapper(async (req, res, next) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(
      new AppError("Invalid credentials", 401, httpstatustext.FAIL)
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch ) {
      return next(
        new AppError("Invalid credentials", 401, httpstatustext.FAIL)
      );
    }


  
  const token = generateToken(user._id);

  res.cookie("token", token, {
  httpOnly: true,
  secure: true,       // production لازم https
  sameSite: "none",   // مهم مع cross-origin
  maxAge: 7 * 24 * 60 * 60 * 1000
});

  res.json({
    status: httpstatustext.SUCCESS,
    message: "Logged in successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    }
  });
});



// =============================
// // LOGOUT
// =============================
const logout = asyncwrapper(async (req, res, next) =>  {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });

  res.json({
    status: "success",
    message: "Logged out successfully"
  });
});


export  {
   login,
   register,
   logout
};