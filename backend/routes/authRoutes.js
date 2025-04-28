const express = require('express');
const { signup, login } = require('../controllers/authController');

const {createBlog,updateBlog,deleteBlog,getAllBlogs} = require('../controllers/blogController');

const {authMiddleware} = require('../middlewares/authMiddleware')
 
 
const router = express.Router();

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);



module.exports = router;


