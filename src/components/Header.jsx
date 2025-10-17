import React from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaPhone, FaEnvelope, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-2 border-b text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-gray-600">
              <FaPhone className="mr-2" /> Hotline: 1900-xxxx
            </span>
            <span className="flex items-center text-gray-600">
              <FaEnvelope className="mr-2" /> support@busbooking.com
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-primary-600 flex items-center">
              <FaUser className="mr-2" /> Đăng nhập
            </Link>
            <Link to="/register" className="text-gray-600 hover:text-primary-600">
              Đăng ký
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <FaBus className="text-primary-600 text-3xl" />
            <span className="text-2xl font-bold text-primary-600">BusBooking</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Trang chủ
            </Link>
            <Link to="/routes" className="text-gray-700 hover:text-primary-600 font-medium">
              Tuyến đường
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium">
              Về chúng tôi
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium">
              Liên hệ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
