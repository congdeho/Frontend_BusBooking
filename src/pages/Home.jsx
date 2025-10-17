import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaBus } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to search results page with query params
    navigate(`/search?from=${searchData.from}&to=${searchData.to}&date=${searchData.date}`);
  };

  const popularRoutes = [
    { from: 'Hà Nội', to: 'Hải Phòng', price: '150.000đ' },
    { from: 'TP.HCM', to: 'Đà Lạt', price: '250.000đ' },
    { from: 'Hà Nội', to: 'Vinh', price: '200.000đ' },
    { from: 'TP.HCM', to: 'Nha Trang', price: '300.000đ' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Đặt vé xe khách trực tuyến
            </h1>
            <p className="text-xl text-primary-100">
              Nhanh chóng, tiện lợi và an toàn
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* From */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Điểm đi
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="from"
                      value={searchData.from}
                      onChange={handleInputChange}
                      placeholder="Nhập điểm đi"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700"
                      required
                    />
                  </div>
                </div>

                {/* To */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Điểm đến
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="to"
                      value={searchData.to}
                      onChange={handleInputChange}
                      placeholder="Nhập điểm đến"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700"
                      required
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày đi
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={searchData.date}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200"
              >
                <FaSearch />
                <span>Tìm chuyến xe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Popular Routes Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Tuyến đường phổ biến
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-6 cursor-pointer"
              onClick={() => navigate(`/search?from=${route.from}&to=${route.to}`)}
            >
              <div className="flex items-center justify-between mb-4">
                <FaBus className="text-primary-600 text-2xl" />
                <span className="text-primary-600 font-bold text-lg">{route.price}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {route.from} - {route.to}
              </h3>
              <p className="text-gray-600 text-sm">Nhiều chuyến trong ngày</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Tại sao chọn chúng tôi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dễ dàng tìm kiếm</h3>
              <p className="text-gray-600">
                Tìm kiếm và so sánh hàng trăm chuyến xe chỉ trong vài giây
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBus className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Đặt vé nhanh chóng</h3>
              <p className="text-gray-600">
                Đặt vé chỉ với vài bước đơn giản và nhận vé điện tử ngay
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">An toàn & Tin cậy</h3>
              <p className="text-gray-600">
                Hệ thống thanh toán an toàn và dịch vụ khách hàng 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
