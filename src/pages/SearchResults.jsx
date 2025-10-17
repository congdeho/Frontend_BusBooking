import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaBus, FaClock, FaMapMarkerAlt, FaChair } from 'react-icons/fa';
import Loading from '../components/Loading';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    busType: 'all',
    priceRange: 'all',
    departureTime: 'all'
  });

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');

  useEffect(() => {
    // Simulate API call
    fetchBuses();
  }, [from, to, date]);

  const fetchBuses = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      // Mock data - Replace with actual API call
      const mockBuses = [
        {
          id: 1,
          company: 'Nam Hải Limousine',
          busType: 'Limousine 34 giường',
          from: from,
          to: to,
          departureTime: '17:00',
          arrivalTime: '19:30',
          duration: '2h30m',
          price: 180000,
          originalPrice: 200000,
          discount: 10,
          availableSeats: 12,
          totalSeats: 34,
          rating: 4.7,
          totalReviews: 3514,
          pickupPoint: 'Văn Phòng Phạm Ngũ Lão',
          dropoffPoint: 'VP Phan Thiết',
          isHotDeal: true,
          dealEndTime: '01:44:50',
          quickConfirm: true,
          image: '/bus-images/limousine.jpg',
          amenities: ['Giảm 20% trả tại điểm đón', 'Giảm 20% trả tại điểm đến'],
          note: 'Vé chặng thuộc chuyến 17:00 17-10-2025 Sài Gòn - Mũi Né'
        },
        {
          id: 2,
          company: 'Phương Trang',
          busType: 'Giường nằm 40 chỗ',
          from: from,
          to: to,
          departureTime: '18:00',
          arrivalTime: '20:30',
          duration: '2h30m',
          price: 150000,
          originalPrice: 180000,
          discount: 17,
          availableSeats: 18,
          totalSeats: 40,
          rating: 4.6,
          totalReviews: 2890,
          pickupPoint: 'Bến xe Miền Đông',
          dropoffPoint: 'Bến xe Phan Thiết',
          isHotDeal: true,
          dealEndTime: '02:30:00',
          quickConfirm: true,
          image: '/bus-images/giuong-nam.jpg',
          amenities: ['Giảm 15% trả tại điểm đón', 'WiFi miễn phí'],
          note: 'Vé chặng thuộc chuyến 18:00 17-10-2025 Sài Gòn - Phan Thiết'
        },
        {
          id: 3,
          company: 'Hoàng Long',
          busType: 'Giường nằm 36 giường',
          from: from,
          to: to,
          departureTime: '19:00',
          arrivalTime: '21:45',
          duration: '2h45m',
          price: 165000,
          originalPrice: 190000,
          discount: 13,
          availableSeats: 15,
          totalSeats: 36,
          rating: 4.5,
          totalReviews: 2156,
          pickupPoint: 'Văn Phòng Bùi Viện',
          dropoffPoint: 'Trung tâm Phan Thiết',
          isHotDeal: false,
          quickConfirm: true,
          image: '/bus-images/hoang-long.jpg',
          amenities: ['Nước suối miễn phí', 'Khăn lạnh'],
          note: 'Xe chất lượng cao, phục vụ tận tình'
        },
        {
          id: 4,
          company: 'Kumho Samco',
          busType: 'Limousine 24 giường',
          from: from,
          to: to,
          departureTime: '20:00',
          arrivalTime: '22:30',
          duration: '2h30m',
          price: 195000,
          originalPrice: 220000,
          discount: 11,
          availableSeats: 8,
          totalSeats: 24,
          rating: 4.8,
          totalReviews: 4021,
          pickupPoint: 'Bến xe An Sương',
          dropoffPoint: 'VP Phan Thiết',
          isHotDeal: true,
          dealEndTime: '03:15:30',
          quickConfirm: true,
          image: '/bus-images/kumho.jpg',
          amenities: ['Giảm 25% trả tại điểm đón', 'Massage ghế'],
          note: 'Limousine cao cấp, ghế massage thư giãn'
        },
        {
          id: 5,
          company: 'Thành Bưởi',
          busType: 'Giường nằm 38 chỗ',
          from: from,
          to: to,
          departureTime: '21:30',
          arrivalTime: '00:15',
          duration: '2h45m',
          price: 140000,
          originalPrice: 170000,
          discount: 18,
          availableSeats: 22,
          totalSeats: 38,
          rating: 4.4,
          totalReviews: 1876,
          pickupPoint: 'Bến xe Miền Tây',
          dropoffPoint: 'Bến xe Phan Thiết',
          isHotDeal: false,
          quickConfirm: false,
          image: '/bus-images/thanh-buoi.jpg',
          amenities: ['Nước uống miễn phí', 'Chăn gối'],
          note: 'Giá rẻ, chất lượng tốt'
        },
        {
          id: 6,
          company: 'Mai Linh Express',
          busType: 'Limousine 28 giường',
          from: from,
          to: to,
          departureTime: '22:00',
          arrivalTime: '00:45',
          duration: '2h45m',
          price: 175000,
          originalPrice: 200000,
          discount: 13,
          availableSeats: 10,
          totalSeats: 28,
          rating: 4.6,
          totalReviews: 2543,
          pickupPoint: 'Văn Phòng Đề Thám',
          dropoffPoint: 'Trung tâm Mũi Né',
          isHotDeal: true,
          dealEndTime: '04:20:00',
          quickConfirm: true,
          image: '/bus-images/mai-linh.jpg',
          amenities: ['Giảm 20% trả tại điểm đến', 'WiFi + USB sạc'],
          note: 'Chuyến đêm, tiện lợi cho khách du lịch'
        }
      ];
      setBuses(mockBuses);
      setLoading(false);
    }, 1000);
  };

  const handleBooking = (busId) => {
    navigate(`/booking/${busId}?from=${from}&to=${to}&date=${date}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) {
    return <Loading />;
  }

  return (
      <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <FaMapMarkerAlt className="text-primary-600 text-2xl" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {from} → {to}
                </h2>
                <p className="text-gray-600">
                  {date ? new Date(date).toLocaleDateString('vi-VN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'Chưa chọn ngày'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-800">Kết quả: <span className="text-primary-600">{buses.length} chuyến</span></p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Filters */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Bộ lọc</h3>
              
              {/* Bus Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Loại xe</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="busType" value="all" className="mr-2" defaultChecked />
                    <span className="text-sm">Tất cả</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="busType" value="seat" className="mr-2" />
                    <span className="text-sm">Ghế ngồi</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="busType" value="bed" className="mr-2" />
                    <span className="text-sm">Giường nằm</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="busType" value="limousine" className="mr-2" />
                    <span className="text-sm">Limousine</span>
                  </label>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Khoảng giá</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="price" value="all" className="mr-2" defaultChecked />
                    <span className="text-sm">Tất cả</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="price" value="low" className="mr-2" />
                    <span className="text-sm">Dưới 200.000đ</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="price" value="medium" className="mr-2" />
                    <span className="text-sm">200.000đ - 300.000đ</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="price" value="high" className="mr-2" />
                    <span className="text-sm">Trên 300.000đ</span>
                  </label>
                </div>
              </div>

              {/* Departure Time Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Giờ xuất phát</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="time" value="all" className="mr-2" defaultChecked />
                    <span className="text-sm">Tất cả</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="time" value="morning" className="mr-2" />
                    <span className="text-sm">Sáng (06:00 - 12:00)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="time" value="afternoon" className="mr-2" />
                    <span className="text-sm">Chiều (12:00 - 18:00)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="time" value="evening" className="mr-2" />
                    <span className="text-sm">Tối (18:00 - 24:00)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Bus List */}
          <div className="lg:col-span-9">
            <div className="space-y-4">
              {buses.map((bus) => (
                <div key={bus.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden relative">
                  {/* Hot Deal Badge */}
                  {bus.isHotDeal && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 flex items-center justify-between z-10">
                      <div className="flex items-center">
                        <span className="text-sm font-bold">🔥 ƯU ĐÃI GIỜ CHÓT</span>
                      </div>
                      <div className="text-sm font-semibold">
                        Kết thúc sau {bus.dealEndTime}
                      </div>
                    </div>
                  )}

                  <div className={`p-5 ${bus.isHotDeal ? 'pt-14' : ''}`}>
                    <div className="flex flex-wrap lg:flex-nowrap gap-4">
                      {/* Bus Image (placeholder) */}
                      <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                        {bus.quickConfirm && (
                          <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center">
                            ⚡ Xác nhận tức thì
                          </div>
                        )}
                        <FaBus className="text-blue-600 text-4xl" />
                      </div>

                      {/* Bus Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">{bus.company}</h3>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-yellow-500 font-semibold text-sm">★ {bus.rating}</span>
                              <span className="text-gray-500 text-xs">({bus.totalReviews})</span>
                            </div>
                            <p className="text-gray-600 text-sm">{bus.busType}</p>
                          </div>
                        </div>

                        {/* Time Info */}
                        <div className="flex items-center space-x-3 mb-3 py-2">
                          <div>
                            <p className="text-xl font-bold text-gray-800">{bus.departureTime}</p>
                            <p className="text-xs text-gray-500 max-w-[120px] truncate">{bus.pickupPoint}</p>
                          </div>
                          <div className="flex flex-col items-center px-3">
                            <FaClock className="text-gray-400 mb-1 text-sm" />
                            <p className="text-xs text-gray-600">{bus.duration}</p>
                          </div>
                          <div>
                            <p className="text-xl font-bold text-gray-800">{bus.arrivalTime}</p>
                            <p className="text-xs text-gray-500 max-w-[120px] truncate">{bus.dropoffPoint}</p>
                          </div>
                        </div>

                        {/* Amenities */}
                        {bus.amenities && bus.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {bus.amenities.map((amenity, idx) => (
                              <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200">
                                🎁 {amenity}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Additional Info */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 px-3 py-2 mb-2">
                          <p className="text-xs text-blue-800">
                            <strong>Thông báo →</strong> {bus.note}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center flex-wrap gap-2">
                          <button className="text-xs text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-green-50 transition">
                            TRẢ TẠI NƠI
                          </button>
                          <button className="text-xs text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition">
                            THEO DÕI HÀNH TRÌNH XE
                          </button>
                        </div>
                      </div>

                      {/* Price & Booking */}
                      <div className="text-right flex flex-col justify-between min-w-[180px]">
                        <div>
                          {bus.discount > 0 && (
                            <div className="flex items-center justify-end gap-2 mb-1">
                              <span className="text-gray-400 line-through text-sm">
                                {formatPrice(bus.originalPrice)}
                              </span>
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                                -{bus.discount}%
                              </span>
                            </div>
                          )}
                          <p className="text-2xl font-bold text-red-600 mb-2">
                            {formatPrice(bus.price)}
                          </p>
                          <div className="flex items-center justify-end text-sm text-gray-600 mb-3">
                            <FaChair className="mr-1" />
                            <span>Còn {bus.availableSeats} chỗ trống</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <button
                            onClick={() => handleBooking(bus.id)}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2.5 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                            disabled={bus.availableSeats === 0}
                          >
                            {bus.availableSeats === 0 ? 'Hết chỗ' : 'Chọn chuyến'}
                          </button>
                          <button className="w-full text-xs text-blue-600 hover:underline">
                            Thông tin chi tiết ▼
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
