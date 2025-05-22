import { useState, useEffect } from "react";
import images from "../utils/imageImports";
import NewSection from "../components/NewSection";
import Services from "../components/Services";
import "./Home.css";
import ClientLogos from "../components/ClientLogos";

const { service10, introduce1, introduce3, introduce4 } = images;

const AutoSweetImages = () => {
  const images = [introduce4, introduce1, introduce3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="auto-sweet-images w-full px-4 sm:px-6 md:px-8 lg:px-12">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="w-full h-48 sm:h-56 md:h-72 lg:h-96 xl:h-[500px] object-cover rounded-lg shadow-lg transition-all duration-500"
      />
    </div>
  );
};

function HomePage() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="bg-[#fafafa] pt-4 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-[120px]">
      <AutoSweetImages />

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-0">
        {/* Introduction Section */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 my-6 sm:my-8 md:my-10 lg:my-12 xl:my-[40px] items-start lg:items-center">
          {/* Text Content */}
          <div className="w-full lg:w-2/3 xl:w-2/3">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#555] font-bold mb-2 sm:mb-3">
              GIỚI THIỆU VỀ INTEST
            </h2>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] xl:text-[28px] text-[#222] font-bold mb-3 sm:mb-4 leading-tight">
              INTEST là đơn vị cung cấp dịch vụ hiệu chuẩn thiết bị, máy móc đạt
              chất lượng cao với mong muốn đem lại cho khách hàng những dịch vụ
              chất lượng, nhanh chóng và hiệu quả.
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#555] leading-relaxed mb-3 sm:mb-4">
              INTEST chuyên cung cấp dịch vụ hiệu chuẩn máy móc và các thiết bị đo
              lường trong các lĩnh vực:
            </p>
            
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm md:text-base text-[#333]">
              <div className="space-y-1">
                <div>- Khối lượng</div>
                <div>- Lực - độ cứng</div>
                <div>- Áp suất</div>
                <div>- Nhiệt</div>
                <div>- Điện - Điện tử</div>
              </div>
              <div className="space-y-1">
                <div>- Độ dài</div>
                <div>- Hoá lý</div>
                <div>- Dung tích - Lưu lượng</div>
                <div>- Quang học - Bức xạ</div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/3 xl:w-1/3 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[300px] xl:max-w-[350px]">
              <img
                src={service10}
                alt='Thiết bị đo lường'
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`w-full h-auto transition-transform duration-300 ease-in-out rounded-lg shadow-md ${
                  isHovering ? 'scale-105 lg:scale-110' : 'scale-100'
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-0 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 lg:p-10">
          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#555] leading-relaxed text-justify">
            INTEST với đội ngũ nhân viên có kinh nghiệm lâu năm trong lĩnh vực
            hiệu chuẩn đo lường, được đào tạo chuyên môn ở Viện Đo Lường Việt Nam
            (VMI), Trung tâm Kỹ thuật Tiêu Chuẩn Đo lường Chất lượng 3 (QUATEST
            3), Trung Tâm Đào Tạo Nghiệp Vụ Tiêu Chuẩn Đo Lường Chất Lượng (QTC)
            cùng với sự đầu tư về máy móc, thiết bị hiện đại.
          </p>
          
          <div className="h-4 sm:h-6"></div>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#555] leading-relaxed text-justify">
            Chúng tôi luôn luôn phát triển để nâng cao kiến thức và chất lượng
            dịch vụ, lắng nghe và tư vấn cho khách hàng giải pháp tối ưu nhất mang
            lại hiệu quả kinh tế cao. Luôn đảm bảo tuân thủ theo các yêu cầu về
            quản lý và năng lực kỹ thuật cùng với hệ thống quản lý chất lượng để
            đưa ra kết quả đo lường có độ tin cậy cao được Quốc Tế thừa nhận.
          </p>
          
          <div className="h-4 sm:h-6"></div>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#555] leading-relaxed text-center font-medium">
            Cảm ơn Quý Khách hàng đã luôn tin tưởng và ủng hộ chúng tôi!
          </p>
        </div>
      </div>

      <Services />

      <NewSection />

      <ClientLogos />
    </div>
  );
}

export default HomePage;