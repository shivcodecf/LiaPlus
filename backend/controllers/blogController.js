const Blog = require("../models/Blog");

// Create a new Blog Post (Admin only)
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and Content are required" });
    }

    const newBlog = new Blog({
      title,
      content,
      author: req.user.id,
      createdBy: req.user._id,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Blog Posts (Public)
exports.getAllBlogs = async (req, res) => {
  try {
   

    const blogs = await Blog.find()
      .populate("author", "name") 
      .sort({ createdAt: -1 });

    console.log(blogs);

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }

};

exports.getSingleBlog = async (req, res) => {
  try {
    // const blog = await Blog.findById(req.params.id);

    const blog = await Blog.findById(req.params.id).populate("author", "name");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Blog Post (Admin only)
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update fields if they are provided
    if (title) blog.title = title;
    if (content) blog.content = content;

    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a Blog Post (Admin only)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await Blog.findByIdAndDelete(req.params.id); // 👈 directly delete

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
