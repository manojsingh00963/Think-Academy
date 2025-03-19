import { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const res = await axios.post('/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      login(res.data.token);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSignup} 
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Sign Up</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700 transition shadow-sm"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700 transition shadow-sm"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700 transition shadow-sm"
            placeholder="Create a password"
            required
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-600 font-medium mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700 transition shadow-sm"
            placeholder="Confirm password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-900 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <span className="text-gray-400">Already have an account?</span>
          <a href="/login" className=" cursor-pointer text-blue-500 hover:text-blue-700 ml-1">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
