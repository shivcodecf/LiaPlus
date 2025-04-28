import React, { useEffect, useState } from "react";
import API from "../../api/Api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await API.get("/blogs/all");
      setBlogs(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle Create Blog
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      await API.post("/blogs/create", newBlog);
      alert("Blog Created Successfully");
      setNewBlog({ title: "", content: "" });
      fetchBlogs(); // Refresh the list
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create blog");
    }
  };

  // Handle Delete Blog
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await API.delete(`/blogs/delete/${id}`);
        alert("Blog Deleted Successfully");
        fetchBlogs(); // Refresh the list
      } catch (error) {
        alert(error.response?.data?.message || "Failed to delete blog");
      }
    }
  };

  const ClickHandler = async () => {
    navigate("/blogs/create");
  };

  // Handle Update Blog
  const handleUpdate = (id) => {
    navigate(`/blogs/update/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-4xl font-bold text-center mb-10 text-black font-[quantico]">
        {/* Admin Dashboard */}
      </h2>

      <button
        onClick={ClickHandler}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Blog
      </button>

      {/* List of Blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[50px]">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {blog.title}
            </h3>
            <p className="text-gray-600 mb-4">{blog.content}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleUpdate(blog._id)}
                className="bg-yellow-400 text-white px-4 py-2 rounded-full hover:bg-yellow-500 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {blogs.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-10">
          No blogs available yet!
        </p>
      )}
    </div>
  );
};

export default AdminDashboard;
