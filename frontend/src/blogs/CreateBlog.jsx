import React, { useEffect, useState } from "react";
import API from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";

const CreateBlog = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const { id } = useParams(); // get id from URL

  // Fetch existing blog if updating
  useEffect(() => {
    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  const fetchBlogDetails = async () => {
    try {
      const response = await API.get(`/blogs/${id}`); // Assuming you have this API to get one blog
      setFormData({
        title: response.data.title,
        content: response.data.content,
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch blog details");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update blog
        await API.put(`/blogs/update/${id}`, formData);
        alert("Blog updated successfully");
      } else {
        // Create blog
        await API.post("/blogs/create", formData);
        alert("Blog created successfully");
      }
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save blog");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-xl transition-transform transform hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight font-[quantico]">
          {id ? "Update Blog" : "Create Blog"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Content
            </label>
            <textarea
              name="content"
              placeholder="Write your content here..."
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-48 resize-none transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            {id ? "Update Blog" : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
