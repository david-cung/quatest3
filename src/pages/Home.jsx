import { useState, useEffect } from "react";
import images from "../utils/imageImports";
import NewSection from "../components/NewSection";
import Services from "../components/Services";
import "./Home.css";
import ClientLogos from "../components/ClientLogos";

const { service10, introduce1, introduce2, introduce4 } = images;

const AutoSweetImages = () => {
  const images = [introduce4, introduce1, introduce2 ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="auto-sweet-images w-full px-4 md:px-8">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="w-full h-64 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-md"
      />
    </div>
  );
};

function HomePage() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="bg-[#fafafa] pt-8 md:pt-16 lg:pt-[120px]">
      <AutoSweetImages />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
        <div className="flex flex-col md:flex-row gap-8 my-8 md:my-10 lg:my-[40px] items-center">
          <div className="md:w-2/3 lg:w-2/3">
            <h2 className="text-lg md:text-xl lg:text-[22px] text-[#555] font-bold mb-2">
              GIỚI THIỆU VỀ INTEST
            </h2>
            <h1 className="text-xl md:text-2xl lg:text-[28px] text-[#222] font-bold mb-4">
              INTEST là đơn vị cung cấp dịch vụ hiệu chuẩn thiết bị, máy móc đạt
              chất lượng cao với mong muốn đem lại cho khách hàng những dịch vụ
              chất lượng, nhanh chóng và hiệu quả.
            </h1>
            <p className="text-base md:text-lg lg:text-[18px] text-[#555] leading-relaxed mb-4">
              INTEST chuyên cung cấp dịch vụ hiệu chuẩn máy móc và các thiết bị đo
              lường trong các lĩnh vực:
            </p>
            <ul className="grid grid-cols-2 gap-2 text-sm md:text-base lg:text-base text-[#333]">
              <li>- Khối lượng</li>
              <li>- Lực - độ cứng</li>
              <li>- Áp suất</li>
              <li>- Nhiệt</li>
              <li>- Điện - Điện tử</li>
              <li>- Độ dài</li>
              <li>- Hoá lý</li>
              <li>- Dung tích - Lưu lượng</li>
              <li>- Quang học - Bức xạ</li>
            </ul>
          </div>

          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={service10}
              alt='Thiết bị đo lường'
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`w-full max-w-[300px] transition-transform duration-300 ease-in-out ${
                isHovering ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-0 mb-8 md:mb-12 lg:mb-16">
        <p className="text-base md:text-lg lg:text-[18px] text-[#555] leading-relaxed">
          INTEST với đội ngũ nhân viên có kinh nghiệm lâu năm trong lĩnh vực
          hiệu chuẩn đo lường, được đào tạo chuyên môn ở Viện Đo Lường Việt Nam
          (VMI), Trung tâm Kỹ thuật Tiêu Chuẩn Đo lường Chất lượng 3 (QUATEST
          3), Trung Tâm Đào Tạo Nghiệp Vụ Tiêu Chuẩn Đo Lường Chất Lượng (QTC)
          cùng với sự đầu tư về máy móc, thiết bị hiện đại.
          <br />
          <br />
          Chúng tôi luôn luôn phát triển để nâng cao kiến thức và chất lượng
          dịch vụ, lắng nghe và tư vấn cho khách hàng giải pháp tối ưu nhất mang
          lại hiệu quả kinh tế cao. Luôn đảm bảo tuân thủ theo các yêu cầu về
          quản lý và năng lực kỹ thuật cùng với hệ thống quản lý chất lượng để
          đưa ra kết quả đo lường có độ tin cậy cao được Quốc Tế thừa nhận.
          <br />
          <br />
          Cảm ơn Quý Khách hàng đã luôn tin tưởng và ủng hộ chúng tôi!
        </p>
      </div>

      <Services />

      <NewSection />

      <ClientLogos/>
    </div>
  );
}

export default HomePage;