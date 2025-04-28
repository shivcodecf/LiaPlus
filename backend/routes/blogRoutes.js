const express = require('express');
const { createBlog, updateBlog, deleteBlog, getAllBlogs,getSingleBlog } = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware'); // Corrected import

const router = express.Router();

// Create Blog - Admin Only
router.post('/create', protect, createBlog);

// Get All Blogs - Public
router.get('/all', getAllBlogs);

router.get('/:id', getSingleBlog);

// Update Blog - Admin Only
router.put('/update/:id', protect, updateBlog);

// Delete Blog - Admin Only
router.delete('/delete/:id', protect, deleteBlog);



module.exports = router;
