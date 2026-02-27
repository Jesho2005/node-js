import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import User from './db/db.mjs';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true 
}));
app.use(session({
  name: 'sessionId',
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false,


  
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}));
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));
app.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  req.session.userId = user._id;
  res.json({message: 'Login successful' });
});
app.post('/signin', async (req, res) => {
  const { uname, upassword } = req.body;
  const exists = await User.findOne({ username: uname });
  if (exists) {
    return res.status(400).json({message: 'User exists' });
  }
  const user = await User.create({
    username: uname,
    password: upassword
  });
  req.session.userId = user._id; 
  res.json({message: 'Registered'});
});
app.get('/dashboard', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const user = await User.findById(req.session.userId);
  res.json(user);
});
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('sessionId');
    res.json({message: 'Logged out' });
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
