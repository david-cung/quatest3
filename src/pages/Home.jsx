import { useState, useEffect, useCallback, useMemo } from "react";
import images from "../utils/imageImports";
import NewSection from "../components/NewSection";
import Services from "../components/Services";
import "./Home.css";
import ClientLogos from "../components/ClientLogos";

const { service10,introduce3 } = images;

// Memoized AutoSweetImages component for better performance
const AutoSweetImages = () => {
  const imageList = useMemo(() => [introduce3], []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Preload images for smoother transitions
  useEffect(() => {
    const preloadImages = imageList.map(src => {
      const img = new Image();
      img.src = src;
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(preloadImages).then(() => {
      setIsLoading(false);
    });
  }, [imageList]);

  useEffect(() => {
    if (isLoading) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 6000); // Giữ nguyên 6s như ban đầu
    
    return () => clearInterval(interval);
  }, [imageList.length, isLoading]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="auto-sweet-images w-full px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Loading skeleton */}
      {isLoading && (
        <div className="w-full h-48 sm:h-56 md:h-72 lg:h-96 xl:h-[500px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg" />
      )}
      
      {/* Simple image display with smooth transitions */}
      <img
        src={imageList[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        onLoad={handleImageLoad}
        className="w-full h-48 sm:h-56 md:h-72 lg:h-96 xl:h-[500px] object-cover rounded-lg shadow-lg transition-all duration-500"
        loading="eager"
      />
    </div>
  );
};

// Memoized service items for better performance
const ServiceItem = ({ children }) => (
  <div className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
    <span>{children}</span>
  </div>
);

function HomePage() {
  const [isImageHovering, setIsImageHovering] = useState(false);

  const serviceCategories = useMemo(() => ({
    left: ["Khối lượng", "Lực - độ cứng", "Áp suất", "Nhiệt", "Điện - Điện tử"],
    right: ["Độ dài", "Hoá lý", "Dung tích - Lưu lượng", "Quang học - Bức xạ"]
  }), []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="pt-4 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-[120px]">
        <AutoSweetImages />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-0">
        {/* Introduction Section with enhanced design */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 mb-8 transform hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
            {/* Text Content */}
            <div className="w-full lg:w-2/3 xl:w-2/3">
              {/* Header with enhanced styling */}
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-4">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <h2 className="text-sm sm:text-base font-semibold text-blue-600 tracking-wide uppercase">
                    Giới thiệu về INTEST
                  </h2>
                </div>
                
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 font-bold mb-4 leading-tight">
                  Dịch vụ hiệu chuẩn thiết bị
                  <span className="text-blue-600"> chất lượng cao</span>
                </h1>
                
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                  Đem lại cho khách hàng những dịch vụ chất lượng, nhanh chóng và hiệu quả trong lĩnh vực hiệu chuẩn máy móc và thiết bị đo lường.
                </p>
              </div>

              {/* Services Section with enhanced design */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
                  Các lĩnh vực chuyên môn
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {serviceCategories.left.map((service, index) => (
                      <ServiceItem key={index}>{service}</ServiceItem>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {serviceCategories.right.map((service, index) => (
                      <ServiceItem key={index}>{service}</ServiceItem>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Image Section */}
            <div className="w-full lg:w-1/3 xl:w-1/3 flex justify-center lg:justify-end mt-6 lg:mt-0">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative">
                  <img
                    src={service10}
                    alt="Thiết bị đo lường chuyên nghiệp"
                    onMouseEnter={() => setIsImageHovering(true)}
                    onMouseLeave={() => setIsImageHovering(false)}
                    className={`w-full max-w-[300px] h-auto transition-all duration-500 ease-out rounded-xl shadow-lg ${
                      isImageHovering 
                        ? 'scale-105 shadow-2xl rotate-1' 
                        : 'scale-100 shadow-lg'
                    }`}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Description Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-0 mb-12">
        <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                Cam kết chất lượng & Chuyên nghiệp
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded mx-auto"></div>
            </div>

            {/* Content cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-gray-800">Đội ngũ chuyên nghiệp:</strong> Nhân viên có kinh nghiệm lâu năm, được đào tạo chuyên môn tại VMI, QUATEST 3, QTC cùng với đầu tư máy móc hiện đại.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-gray-800">Chất lượng quốc tế:</strong> Tuân thủ các yêu cầu quản lý và năng lực kỹ thuật, đảm bảo kết quả đo lường tin cậy được quốc tế thừa nhận.
                  </p>
                </div>
              </div>
            </div>

            {/* Thank you message */}
            <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
              <p className="text-lg font-medium">
                🙏 Cảm ơn Quý Khách hàng đã luôn tin tưởng và ủng hộ chúng tôi!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Other sections */}
      <Services />
      <NewSection />
      <ClientLogos />
    </div>
  );
}

export default HomePage;