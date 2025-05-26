import { useState } from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import EmailIcon from '@mui/icons-material/Email';

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log({ name, phone, message });
      
      // Reset form after successful submission
      setName("");
      setPhone("");
      setMessage("");
      alert("Tin nhắn đã được gửi thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon className="w-5 h-5 text-red-600" />,
      label: "Địa chỉ",
      value: "91 An Dương Vương, phường Trần Phú, TP. Quảng Ngãi, tỉnh Quảng Ngãi"
    },
    {
      icon: <PhoneIcon className="w-5 h-5 text-red-600" />,
      label: "Điện thoại",
      value: "098 7852 752"
    },
    {
      icon: <MessageIcon className="w-5 h-5 text-red-600" />,
      label: "Zalo",
      value: "098 7852 752"
    },
    {
      icon: <EmailIcon className="w-5 h-5 text-red-600" />,
      label: "Email",
      value: "info@intest.vn"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-8 sm:pt-24 sm:py-12 md:py-16 lg:py-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-8 sm:mb-12">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Liên Hệ Với Chúng Tôi
          </h1>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn về các dịch vụ hiệu chuẩn thiết bị đo lường
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          
          {/* Left Section - Contact Information */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 h-full">
              {/* Company Info Header */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 relative">
                  THÔNG TIN LIÊN HỆ
                  <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                </h2>
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 sm:p-6 border border-red-100">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                    CÔNG TY CỔ PHẦN KIỂM ĐỊNH HIỆU CHUẨN ĐO LƯỜNG KHU VỰC 2
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Đơn vị chuyên nghiệp trong lĩnh vực hiệu chuẩn thiết bị đo lường
                  </p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <div className={`flex-shrink-0 p-2 sm:p-3 rounded-full transition-all duration-300 ${
                      isHovered === index ? 'bg-red-600 text-white' : 'bg-red-100'
                    }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
                        {item.label}
                      </h4>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed break-words">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="border-t border-gray-200 pt-6 sm:pt-8">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                  Kết nối với chúng tôi
                </h4>
                <div className="flex space-x-3 sm:space-x-4">
                  <button className="group p-3 sm:p-4 bg-blue-50 hover:bg-blue-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </button>
                  <button className="group p-3 sm:p-4 bg-red-50 hover:bg-red-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <YouTubeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </button>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-6 sm:mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border border-green-100">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                  Giờ làm việc
                </h4>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Thứ 2 - Thứ 6</span>
                    <span className="font-medium">8:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thứ 7</span>
                    <span className="font-medium">8:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chủ nhật</span>
                    <span className="font-medium text-red-600">Nghỉ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 h-full">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                  GỬI TIN NHẮN
                </h2>
                <p className="text-sm sm:text-base text-red-100">
                  Để lại thông tin, chúng tôi sẽ liên hệ tư vấn ngay
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Họ và tên *"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl border-0 shadow-lg focus:ring-4 focus:ring-white/20 focus:outline-none transition-all duration-300 placeholder-gray-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Số điện thoại *"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl border-0 shadow-lg focus:ring-4 focus:ring-white/20 focus:outline-none transition-all duration-300 placeholder-gray-400"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="relative">
                  <textarea
                    placeholder="Bạn có nhắn nhủ gì với chúng tôi?!"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl border-0 shadow-lg focus:ring-4 focus:ring-white/20 focus:outline-none transition-all duration-300 placeholder-gray-400 resize-none"
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-2 sm:pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || !phone.trim()}
                    className="group w-full bg-white hover:bg-gray-50 text-red-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-red-600"></div>
                        <span>Đang gửi...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Gửi tin nhắn</span>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>

                {/* Form Note */}
                <div className="text-center pt-2">
                  <p className="text-xs sm:text-sm text-red-100">
                    * Thông tin bắt buộc. Chúng tôi cam kết bảo mật thông tin của bạn.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section (Optional) */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 text-center border-b border-gray-200">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Vị Trí Của Chúng Tôi
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                91 An Dương Vương, phường Trần Phú, TP. Quảng Ngãi, tỉnh Quảng Ngãi
              </p>
            </div>
            <div className="h-64 sm:h-80 md:h-96 relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.7234567890123!2d108.79123456789012!3d15.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDA3JzI0LjQiTiAxMDjCsDQ3JzI4LjQiRQ!5e0!3m2!1svi!2svn!4v1234567890123!5m2!1svi!2svn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí Công ty INTEST"
                className="absolute inset-0"
              ></iframe>
              
              {/* Map Overlay with Address */}
              <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <LocationOnIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                      CÔNG TY CỔ PHẦN KIỂM ĐỊNH HIỆU CHUẨN ĐO LƯỜNG KHU VỰC 2
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      91 An Dương Vương, phường Trần Phú, TP. Quảng Ngãi, tỉnh Quảng Ngãi
                    </p>
                  </div>
                </div>
              </div>

              {/* Directions Button */}
              <div className="absolute bottom-4 right-4">
                <a
                  href="https://www.google.com/maps/dir//91+An+Dương+Vương,+Trần+Phú,+Quảng+Ngãi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-xs sm:text-sm font-medium flex items-center space-x-1 sm:space-x-2"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>Chỉ đường</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;