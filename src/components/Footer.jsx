import React from 'react';
import { FaBus, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaBus className="text-primary-400 text-2xl" />
              <span className="text-xl font-bold">BusBooking</span>
            </div>
            <p className="text-gray-400 text-sm">
              Hệ thống đặt vé xe khách trực tuyến hàng đầu Việt Nam. 
              Đặt vé nhanh chóng, an toàn và tiện lợi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-gray-400 hover:text-white">Về chúng tôi</a></li>
              <li><a href="/routes" className="text-gray-400 hover:text-white">Tuyến đường</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white">Điều khoản</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white">Chính sách bảo mật</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/faq" className="text-gray-400 hover:text-white">Câu hỏi thường gặp</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Liên hệ</a></li>
              <li><a href="/booking-guide" className="text-gray-400 hover:text-white">Hướng dẫn đặt vé</a></li>
              <li><a href="/payment" className="text-gray-400 hover:text-white">Thanh toán</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Hotline: 1900-xxxx</li>
              <li>Email: support@busbooking.com</li>
              <li>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 BusBooking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
