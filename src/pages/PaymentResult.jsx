import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const PaymentResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const status = searchParams.get('status'); // success or failed
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  const isSuccess = status === 'success';

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {isSuccess ? (
            <>
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Thanh toán thành công!</h1>
              <p className="text-gray-600 mb-6">
                Cảm ơn bạn đã đặt vé. Thông tin vé đã được gửi đến email của bạn.
              </p>
              
              {orderId && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600">Mã đơn hàng</p>
                  <p className="text-xl font-bold text-gray-800">{orderId}</p>
                </div>
              )}

              {amount && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600">Số tiền đã thanh toán</p>
                  <p className="text-2xl font-bold text-green-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}
                  </p>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
                >
                  Về trang chủ
                </button>
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="border border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition duration-200"
                >
                  Xem vé của tôi
                </button>
              </div>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Thanh toán thất bại!</h1>
              <p className="text-gray-600 mb-6">
                Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate(-1)}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
                >
                  Thử lại
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="border border-gray-400 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition duration-200"
                >
                  Về trang chủ
                </button>
              </div>
            </>
          )}
        </div>

        {isSuccess && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Lưu ý:</strong> Vui lòng mang theo mã đơn hàng và CMND/CCCD khi lên xe.
              Nếu có thắc mắc, vui lòng liên hệ hotline: <strong>1900-xxxx</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;
