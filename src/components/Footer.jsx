import { Phone, MapPin, Mail, Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

// Mock Banner component since it's not available
const Banner = () => (
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 text-center">
    <p className="text-sm md:text-base">🎉 Khuyến mãi đặc biệt cho dịch vụ hiệu chuẩn - Liên hệ ngay!</p>
  </div>
);

function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      color: "text-red-500",
      text: "91 An Dương Vương, phường Trần Phú, TP. Quảng Ngãi, tỉnh Quảng Ngãi",
      type: "address"
    },
    {
      icon: MapPin,
      color: "text-red-500",
      text: "18/29 Alley 42, phường Thanh Bình, phường Mộ Lao, quận Hà Đông, TP. Hà Nội",
      type: "address"
    },
    {
      icon: MapPin,
      color: "text-red-500",
      text: "156 Vườn Lài, An Phú Đông, quận 12, TP. HCM",
      type: "address"
    },
    {
      icon: Phone,
      color: "text-green-500",
      text: "0987 852 752",
      type: "phone",
      href: "tel:0987852752"
    },
    {
      icon: Phone,
      color: "text-blue-500",
      text: "Zalo: 0987 852 752",
      type: "zalo"
    },
    {
      icon: Mail,
      color: "text-yellow-500",
      text: "info@intest.vn",
      type: "email",
      href: "mailto:info@intest.vn"
    }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com",
      bgColor: "bg-[#3b5998]",
      label: "Facebook"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com",
      bgColor: "bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-500",
      label: "Instagram"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com",
      bgColor: "bg-[#0077b5]",
      label: "LinkedIn"
    }
  ];

  const quickLinks = [
    { name: "Dịch vụ hiệu chuẩn", href: "#services" },
    { name: "Kiểm định thiết bị", href: "#testing" },
    { name: "Bảo trì & Sửa chữa", href: "#maintenance" },
    { name: "Đào tạo", href: "#training" },
    { name: "Liên hệ", href: "#contact" }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white relative">
      <Banner />
      
      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Company Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-800 font-bold mb-4 leading-tight">
                Công ty cổ phần Kiểm định Hiệu chuẩn Đo lường Khu vực 2
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 mb-4"></div>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Intest là đơn vị chuyên các giải pháp toàn diện từ hiệu chuẩn, kiểm định thiết bị đến bảo trì – sửa chữa,
                đào tạo và huấn luyện. Nhờ áp dụng những công nghệ đứng đầu xu hướng, thiết bị hiệu chuẩn hiện đại, Intest
                luôn không ngừng nâng cao chất lượng dịch vụ và là địa chỉ hiệu chuẩn uy tín giúp khách hàng có thêm sự
                lựa chọn.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Dịch vụ nổi bật</h3>
              <div className="flex flex-wrap gap-2">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl text-gray-800 font-bold mb-6">Thông tin liên hệ</h2>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon;
                  const content = (
                    <div className="flex items-start group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                      <IconComponent className={`mr-3 mt-1 flex-shrink-0 ${contact.color} group-hover:scale-110 transition-transform duration-200`} size={20} />
                      <span className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {contact.text}
                      </span>
                    </div>
                  );

                  return contact.href ? (
                    <a key={index} href={contact.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={index}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>




          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © Công ty cổ phần Kiểm định Hiệu chuẩn Đo lường Khu vực 2. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-gray-500 hover:text-blue-600 transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#terms" className="text-gray-500 hover:text-blue-600 transition-colors">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
}

export default Footer;