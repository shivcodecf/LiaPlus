import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserDashboard from './components/dashboard/UserDashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './common/Navbar';
import GetBlogs from './blogs/GetBlogs';
import CreateBlog from './blogs/CreateBlog';


function App() {
  return (
    <Router>
    <Navbar />

    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/blogs/create" element={<CreateBlog />} />
      <Route path="/blogs/update/:id" element={<CreateBlog />} />

      {/* Protected Routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/user"
        element={
          <PrivateRoute allowedRoles={['user']}>
            <GetBlogs />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
  );
}

export default App;
