import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">Blog Platform</div>

      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/signup" className="hover:underline">Signup</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        ) : (
          <>
            {user?.role === 'admin' ? (
              <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
            ) : (
              <Link to="/user" className="hover:underline">User Dashboard</Link>
            )}
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
