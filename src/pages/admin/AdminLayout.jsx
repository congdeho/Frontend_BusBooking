import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const adminMenus = [
  { path: '/admin/users', label: 'Quản lý người dùng' },
  { path: '/admin/buses', label: 'Quản lý xe & tài xế' },
  { path: '/admin/promotions', label: 'Quản lý khuyến mãi' },
  { path: '/admin/routes', label: 'Quản lý tuyến & giá vé' },
  { path: '/admin/bookings', label: 'Đặt vé & hủy vé' },
  { path: '/admin/payments', label: 'Thanh toán & hóa đơn' },
  { path: '/admin/notifications', label: 'Thông báo cho khách' },
  { path: '/admin/reports', label: 'Báo cáo & thống kê' },
];

export default function AdminLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-xl text-primary-700 border-b">Admin Panel</div>
        <nav className="flex-1 py-4">
          {adminMenus.map(menu => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`block px-6 py-3 text-gray-700 hover:bg-primary-50 rounded-r-full transition font-medium ${location.pathname.startsWith(menu.path) ? 'bg-primary-100 text-primary-700 font-bold' : ''}`}
            >
              {menu.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
