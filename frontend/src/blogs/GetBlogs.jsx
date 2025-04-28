import React, { useEffect, useState } from 'react';
import API from '../api/Api';

const GetBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await API.get('/blogs/all');
        setBlogs(response.data);
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to load blogs');
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
    <h2 className="text-5xl font-extrabold text-center mb-12 text-blue-700 tracking-wide">
      {/* Latest Blogs */}
    </h2>
  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
  {blogs.map((blog) => (
    <div
      key={blog._id}
      className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between hover:scale-[1.02]"
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors duration-300">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-base leading-relaxed">
          {blog.content.length > 150 ? blog.content.substring(0, 150) + '...' : blog.content}
        </p> 
        
       
        
      </div>
      <div className="mt-6 text-sm text-gray-400 flex items-center justify-between">
        {/* <span>Posted on: {new Date(blog.createdAt).toLocaleDateString()}</span> */}
        <p className="text-gray-600 text-sm">
  Created by <span className="font-semibold">{blog.author ? blog.author.name : "Unknown Author"}</span>
</p>
        {/* Optional: Add Read More */}
        {/* <button className="text-blue-500 hover:underline text-sm">Read More</button> */}

        <p className="text-gray-400 text-xs">
  Published on {new Date(blog.createdAt).toLocaleDateString()}
</p>
      </div>
    </div>
  ))}
</div>

  
    {blogs.length === 0 && (
      <p className="text-center text-gray-500 text-lg mt-12">No blogs available yet. Start writing!</p>
    )}
  </div>
  );
};

export default GetBlogs;
