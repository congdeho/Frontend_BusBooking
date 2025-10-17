import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { FaBus, FaUser, FaPhone, FaEnvelope, FaChair } from 'react-icons/fa';

const Booking = () => {
  const { busId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [busInfo, setBusInfo] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');

  useEffect(() => {
    // Fetch bus details - Mock data
    const mockBusInfo = {
      id: busId,
      company: 'Xe Phương Trang',
      busType: 'Giường nằm',
      from: from,
      to: to,
      departureTime: '06:00',
      arrivalTime: '12:00',
      price: 250000,
      totalSeats: 40
    };
    setBusInfo(mockBusInfo);
  }, [busId]);

  // Generate seat layout (40 seats in 10 rows x 4 columns)
  const generateSeats = () => {
    const seats = [];
    const bookedSeats = [3, 7, 12, 15, 20, 25, 28, 33]; // Mock booked seats
    
    for (let i = 1; i <= 40; i++) {
      seats.push({
        number: i,
        isBooked: bookedSeats.includes(i),
        isSelected: selectedSeats.includes(i)
      });
    }
    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seatNumber, isBooked) => {
    if (isBooked) return;

    setSelectedSeats(prev => {
      if (prev.includes(seatNumber)) {
        return prev.filter(s => s !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return busInfo ? selectedSeats.length * busInfo.price : 0;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedSeats.length === 0) {
      alert('Vui lòng chọn ít nhất một ghế!');
      return;
    }

    // Validate customer information
    if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.email) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // Navigate to payment page with booking information
    const paymentUrl = `/payment/${busId}?from=${from}&to=${to}&date=${date}&seats=${selectedSeats.join(',')}&name=${encodeURIComponent(customerInfo.fullName)}&phone=${customerInfo.phone}&email=${encodeURIComponent(customerInfo.email)}`;
    
    navigate(paymentUrl);
  };

  if (!busInfo) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Đặt vé xe</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Seat Selection */}
          <div className="lg:col-span-2">
            {/* Bus Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <FaBus className="text-primary-600 text-2xl mr-3" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{busInfo.company}</h2>
                  <p className="text-gray-600">{busInfo.busType}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Điểm đi:</p>
                  <p className="font-semibold">{from}</p>
                </div>
                <div>
                  <p className="text-gray-600">Điểm đến:</p>
                  <p className="font-semibold">{to}</p>
                </div>
                <div>
                  <p className="text-gray-600">Ngày đi:</p>
                  <p className="font-semibold">{date}</p>
                </div>
                <div>
                  <p className="text-gray-600">Giờ khởi hành:</p>
                  <p className="font-semibold">{busInfo.departureTime}</p>
                </div>
              </div>
            </div>

            {/* Seat Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Chọn ghế</h3>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 border-2 border-gray-300 rounded mr-2"></div>
                  <span>Trống</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-500 border-2 border-primary-600 rounded mr-2"></div>
                  <span>Đang chọn</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-400 border-2 border-gray-500 rounded mr-2"></div>
                  <span>Đã đặt</span>
                </div>
              </div>

              {/* Seat Layout */}
              <div className="flex justify-center">
                <div className="inline-block">
                  {/* Driver indicator */}
                  <div className="mb-4 text-center">
                    <div className="inline-block bg-gray-300 px-4 py-2 rounded">
                      🚗 Tài xế
                    </div>
                  </div>

                  {/* Seats Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    {seats.map((seat) => (
                      <button
                        key={seat.number}
                        onClick={() => handleSeatClick(seat.number, seat.isBooked)}
                        disabled={seat.isBooked}
                        className={`
                          w-12 h-12 rounded border-2 font-semibold text-sm
                          transition duration-200
                          ${seat.isBooked 
                            ? 'bg-gray-400 border-gray-500 cursor-not-allowed text-white'
                            : seat.isSelected
                            ? 'bg-primary-500 border-primary-600 text-white'
                            : 'bg-gray-200 border-gray-300 hover:bg-gray-300 text-gray-700'
                          }
                        `}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin khách hàng</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={customerInfo.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ghi chú
                    </label>
                    <textarea
                      name="notes"
                      value={customerInfo.notes}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Nhập ghi chú (nếu có)"
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Thông tin đặt vé</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tuyến:</span>
                  <span className="font-semibold">{from} → {to}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ngày đi:</span>
                  <span className="font-semibold">{date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Giờ khởi hành:</span>
                  <span className="font-semibold">{busInfo.departureTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Giá vé:</span>
                  <span className="font-semibold">{formatPrice(busInfo.price)}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Ghế đã chọn:</span>
                  <span className="font-semibold">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn'}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Số lượng:</span>
                  <span className="font-semibold">{selectedSeats.length} ghế</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={selectedSeats.length === 0}
                className={`
                  w-full py-3 rounded-lg font-semibold transition duration-200
                  ${selectedSeats.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }
                `}
              >
                Xác nhận đặt vé
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Vé sẽ được gửi đến email của bạn sau khi thanh toán thành công
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
