import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaPhone, FaEnvelope, FaUser, FaChevronDown } from 'react-icons/fa';
import { getCurrentUser, logout } from '../services/authService';

const Header = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setUser(getCurrentUser());

    const handleAuthChange = () => setUser(getCurrentUser());
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('authChanged', handleAuthChange);

    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('touchstart', onDocClick);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChanged', handleAuthChange);
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('touchstart', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

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
            {!user ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary-600 flex items-center">
                  <FaUser className="mr-2" /> Đăng nhập
                </Link>
                <Link to="/register" className="text-gray-600 hover:text-primary-600">
                  Đăng ký
                </Link>
              </>
            ) : (
              <div className="relative" ref={containerRef}>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="flex items-center text-gray-600 hover:text-primary-600 rounded-full px-2 py-1"
                    onClick={() => setIsOpen((s) => !s)}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-label="Tài khoản"
                  >
                    <FaUser className="text-xl mr-2" />
                    <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3">
                      <p className="font-semibold text-sm text-gray-900">{user.fullName || 'Người dùng'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className="border-t">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Thông tin tài khoản</Link>
                      <button onClick={() => logout()} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Đăng xuất</button>
                    </div>
                  </div>
                )}
              </div>
            )}
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
