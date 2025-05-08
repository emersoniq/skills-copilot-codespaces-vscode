// Create web server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create a schema and model for comments
const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    comment: String,
});

const Comment = mongoose.model('Comment', commentSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});