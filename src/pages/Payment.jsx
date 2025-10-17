import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { FaBus, FaUser, FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const Payment = () => {
  const { busId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('vnpay');
  const [bookingInfo, setBookingInfo] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5 * 60 + 56); // 5:56 in seconds

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');
  const seats = searchParams.get('seats')?.split(',') || [];
  const customerName = searchParams.get('name');
  const customerPhone = searchParams.get('phone');
  const customerEmail = searchParams.get('email');

  useEffect(() => {
    // Fetch booking details - Mock data
    const mockBooking = {
      id: busId,
      company: 'Nam Hải Limousine',
      busType: 'Limousine 34 giường',
      from: from,
      to: to,
      date: date,
      departureTime: '17:00',
      arrivalTime: '19:30',
      pickupPoint: 'Văn Phòng Phạm Ngũ Lão',
      dropoffPoint: 'VP Phan Thiết',
      seats: seats,
      pricePerSeat: 180000,
      customer: {
        name: customerName,
        phone: customerPhone,
        email: customerEmail
      }
    };
    setBookingInfo(mockBooking);
  }, [busId]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const calculateTotal = () => {
    if (!bookingInfo) return 0;
    return bookingInfo.seats.length * bookingInfo.pricePerSeat;
  };

  const handlePayment = () => {
    // TODO: Call API to process payment
    const paymentData = {
      bookingId: bookingInfo.id,
      amount: calculateTotal(),
      paymentMethod: 'vnpay',
      returnUrl: window.location.origin + '/payment-result'
    };

    console.log('Processing payment:', paymentData);
    
    // Simulate VNPay redirect
    alert('Đang chuyển đến cổng thanh toán VNPay...');
    // In production: window.location.href = vnpayUrl;
  };

  if (!bookingInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Countdown Timer */}
        <div className="bg-primary-600 text-white text-center py-3 rounded-lg mb-6 shadow-md">
          <p className="text-sm">Thời gian thanh toán còn lại</p>
          <p className="text-2xl font-bold">{formatTime(timeLeft)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2">
            {/* Trip Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Thông tin chuyến đi</h2>
              
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaBus className="text-blue-600 text-3xl" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{bookingInfo.company}</h3>
                  <p className="text-sm text-gray-600 mb-2">{bookingInfo.busType}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <p className="font-semibold">{bookingInfo.departureTime}</p>
                      <p className="text-gray-600">{bookingInfo.pickupPoint}</p>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <div className="w-8 border-t-2 border-dashed"></div>
                      <FaClock className="mx-1" />
                      <div className="w-8 border-t-2 border-dashed"></div>
                    </div>
                    <div>
                      <p className="font-semibold">{bookingInfo.arrivalTime}</p>
                      <p className="text-gray-600">{bookingInfo.dropoffPoint}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-700">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1 text-primary-600" />
                      <span>{from} → {to}</span>
                    </div>
                    <span>•</span>
                    <span>Ngày {date}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-600">Ghế đã chọn:</span>
                  <span className="font-semibold text-gray-800">{bookingInfo.seats.join(', ')}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Số lượng:</span>
                  <span className="font-semibold text-gray-800">{bookingInfo.seats.length} ghế</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Thông tin liên hệ</h2>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaUser className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500">Hành khách</p>
                    <p className="font-semibold text-gray-800">{bookingInfo.customer.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaPhone className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500">Số điện thoại</p>
                    <p className="font-semibold text-gray-800">{bookingInfo.customer.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">{bookingInfo.customer.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-primary-500">
                Phương thức thanh toán
              </h2>
              
              {/* VNPay Option */}
              <div className="border rounded-lg overflow-hidden">
                <label className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="vnpay"
                    checked={paymentMethod === 'vnpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 w-5 h-5 text-primary-600"
                  />
                  <div className="flex items-center flex-1">
                    <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-xs">VNPAY</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Thanh toán VNPAY - QR</p>
                      <p className="text-sm text-gray-600">
                        Thanh toán dễ dàng bằng ứng dụng Ngân hàng (Mobile Banking) hoặc Ví VNPAY
                      </p>
                    </div>
                  </div>
                </label>

                {/* Discount Info */}
                {paymentMethod === 'vnpay' && (
                  <div className="bg-blue-50 border-t border-blue-100 p-4">
                    <p className="text-sm text-blue-800 mb-2">💡 Chuyển đi rộng được bảo vệ</p>
                    <p className="text-xs text-gray-600">
                      Chỉ áp dụng khi thanh toán tại văn phòng, chuyển nhượng vé và sử dụng dịch vụ định vị, nhắc chuyến đang có ở tài khoản
                    </p>
                  </div>
                )}
              </div>

              {/* Note */}
              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-gray-700">
                  <strong>Lưu ý:</strong> Sau khi hoàn tất thanh toán, vé điện tử sẽ được gửi đến email của bạn.
                  Vui lòng kiểm tra hòm thư và làm theo hướng dẫn.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4 pb-3 border-b">Tổng tiền</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Giá vé ({bookingInfo.seats.length} ghế)</span>
                  <span className="font-semibold">{formatPrice(calculateTotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí dịch vụ</span>
                  <span className="font-semibold">0đ</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Giảm giá</span>
                  <span className="font-semibold">-0đ</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-red-600">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
                <p className="text-xs text-gray-500 text-right">Đã bao gồm VAT</p>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <span className="mr-2">💳</span>
                Thanh toán
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Bằng việc nhấn nút Thanh toán, bạn đồng ý với{' '}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Chính sách bán vé
                </a>{' '}
                và{' '}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Điều khoản thanh toán
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Bạn đã chọn nhận được bảo vệ về vé đã đặt mua sẽ dễ dàng hơn
              </p>
              <p className="text-xs text-gray-600">
                Vé được đặt bằng phương pháp thanh toán Vận Chuyển đi rộng sẽ được bảo vệ bởi điểm trả của nhà xe.
                Hãy đảm bảo hay làm theo hướng dẫn khi mua dự đối mặt rủi ro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
