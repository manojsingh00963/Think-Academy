import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold">ThinkAcademy</h3>
          <p className="text-gray-300 mt-2">
            © {new Date().getFullYear()} ThinkAcademy. All rights reserved.
          </p>
        </div>

        {/* Center Section */}
        <div className="flex flex-col space-x-6 mt-4 md:mt-0">
          <Link to="/" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/" className="hover:text-gray-300">
            contact
          </Link>
          <Link to="/" className="hover:text-gray-300">
            Privacy Policy
          </Link>
          <Link to="/" className="hover:text-gray-300">
            Terms of Service
          </Link>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;
