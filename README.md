# Bus Booking Frontend

Hệ thống đặt vé xe khách đường dài - Frontend (React + Tailwind CSS)

## 🚀 Tính năng

- ✅ Tìm kiếm chuyến xe theo tuyến đường và ngày
- ✅ Hiển thị danh sách các chuyến xe phù hợp
- ✅ Chọn ghế ngồi trực quan
- ✅ Đặt vé và nhập thông tin khách hàng
- ✅ Giao diện responsive, thân thiện với người dùng
- ✅ Tích hợp sẵn với Spring Boot Backend

## 🛠️ Công nghệ sử dụng

- **React 18** - UI Library
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **Vite** - Build Tool
- **React Icons** - Icon Library

## 📦 Cài đặt

### Yêu cầu

- Node.js >= 16.x
```

### Bước 2: Cấu hình Backend URL

Mở file `src/services/api.js` và cập nhật URL của Spring Boot backend:
const API_BASE_URL = 'http://localhost:8080/api';
```

### Bước 3: Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## 📁 Cấu trúc dự án

```
Frontend BusBooking/
├── public/                 # Static files
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Loading.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── SearchResults.jsx
│   │   └── Booking.jsx
│   ├── services/          # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── busService.js
│   │   └── bookingService.js
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🎨 Các trang chính

### 1. Trang chủ (Home)
- Form tìm kiếm chuyến xe
- Hiển thị các tuyến đường phổ biến
- Giới thiệu tính năng

### 2. Trang kết quả tìm kiếm (SearchResults)
- Danh sách các chuyến xe
- Bộ lọc theo loại xe, giá, giờ xuất phát
- Thông tin chi tiết từng chuyến
- Badge ưu đãi giờ chót với countdown
- Thông tin đánh giá và amenities

### 4. Trang thanh toán (Payment)
- Countdown thời gian thanh toán
- Tổng tiền và xác nhận thanh toán

## 🔌 Kết nối với Backend
### API Services

- **bookingService.js**: Tạo, hủy, quản lý đặt vé

### Ví dụ sử dụng

```javascript
import { searchBuses } from './services/busService';

const buses = await searchBuses('Hà Nội', 'Hải Phòng', '2025-10-20');
```

## 🚀 Build cho Production

```bash
npm run build
```

Files build sẽ được tạo trong thư mục `dist/`

## 📝 API Endpoints (Backend cần implement)

### Buses
- `GET /api/buses/search?from={from}&to={to}&date={date}` - Tìm kiếm xe
- `GET /api/buses/{id}` - Chi tiết xe
- `GET /api/buses/{id}/seats?date={date}` - Ghế còn trống

### Bookings
- `POST /api/bookings` - Tạo đơn đặt vé
- `GET /api/bookings/{id}` - Chi tiết đơn đặt
- `PUT /api/bookings/{id}/cancel` - Hủy đơn đặt

### Auth
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `PUT /api/auth/users/{id}` - Cập nhật thông tin

### Payments
- `POST /api/payments/vnpay/create` - Tạo link thanh toán VNPay
- `POST /api/payments/vnpay/verify` - Verify kết quả thanh toán
- `GET /api/payments/{id}` - Chi tiết giao dịch
- `POST /api/payments/{id}/refund` - Hoàn tiền

## 🎯 Tính năng tiếp theo

- [ ] Xác thực người dùng (Login/Register)
- [ ] Trang quản lý đơn hàng của khách
- [ ] Tích hợp thanh toán online
- [ ] Đánh giá và nhận xét
- [ ] Thông báo real-time
- [ ] Trang quản trị (Admin Dashboard)

## 📞 Liên hệ

Nếu có thắc mắc, vui lòng liên hệ: support@busbooking.com

---

**Happy Coding! 🚌✨**
