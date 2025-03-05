import Banner from "./Banner";
import { Phone, MapPin, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-[#fefefe] w-full">
      <Banner />
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          {/* Company Overview */}
          <div className="md:w-2/3 lg:w-3/5">
            <h2 className="text-xl md:text-2xl lg:text-[28px] text-[#333] font-bold mb-4">
              Công ty cổ phần Kiểm định Hiệu chuẩn Đo lường Khu vực 2
            </h2>
            <p className="text-base md:text-lg text-[#555] leading-relaxed">
              Intest là đơn vị chuyên các giải pháp toàn diện từ hiệu chuẩn, kiểm định thiết bị đến bảo trì – sửa chữa,
              đào tạo và huấn luyện. Nhờ áp dụng những công nghệ đứng đầu xu hướng, thiết bị hiệu chuẩn hiện đại, Intest
              luôn không ngừng nâng cao chất lượng dịch vụ và là địa chỉ hiệu chuẩn uy tín giúp khách hàng có thêm sự
              lựa chọn.
            </p>
          </div>

          {/* Contact Information */}
          <div className="md:w-1/3 lg:w-2/5">
            <h2 className="text-xl md:text-2xl text-[#333] font-bold mb-4">Liên hệ</h2>
            <ul className="space-y-4">
              <li className="flex items-center text-[#555]">
                <MapPin className="mr-3 text-red-500" size={24} />
                <span className="text-base">
                  91 An Dương Vương, phường Trần Phú, TP. Quảng Ngãi, tỉnh Quảng Ngãi
                </span>
              </li>
              <li className="flex items-center text-[#555]">
                <Phone className="mr-3 text-green-500" size={24} />
                <span className="text-base">098 7852 752</span>
              </li>
              <li className="flex items-center text-[#555]">
                <Phone className="mr-3 text-blue-500" size={24} />
                <span className="text-base">Zalo: 098 7852 752</span>
              </li>
              <li className="flex items-center text-[#555]">
                <Mail className="mr-3 text-yellow-500" size={24} />
                <span className="text-base">info@intest.vn</span>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#3b5998] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#c13584] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0077b5] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;