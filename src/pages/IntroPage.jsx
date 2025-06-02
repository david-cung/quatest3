import { useState, useEffect } from "react";
import images from "../utils/imageImports";

const { intro1 } = images;

const IntroPage = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Remove any body styles that might conflict
    document.body.style.backgroundColor = "#f9f9f9";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    
    return () => {
      // Cleanup on unmount
      document.body.style.backgroundColor = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-8 sm:pt-24 sm:py-12 md:py-16 lg:py-20">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                Giới Thiệu Chung
              </h1>
              <div className="w-20 sm:w-24 md:w-32 h-1 bg-white/30 mx-auto rounded-full"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
              
              {/* Text Content */}
              <div className="flex-1 space-y-6 sm:space-y-8">
                {/* Introduction Paragraph */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-700 mb-6 sm:mb-8">
                    <span className="font-semibold text-blue-600">Công ty cổ phần Kiểm định Hiệu chuẩn Đo lường Khu vực 2 – Intest</span> tự hào là một trong những đơn vị hoạt động trong lĩnh vực hiệu chuẩn thiết bị, kiểm định, đào tạo và huấn luyện, bảo trì và sửa chữa các thiết bị đo, các thiết bị máy móc chuyên dụng cho đa dạng lĩnh vực khác nhau, cụ thể như:
                  </p>
                </div>

                {/* Services List */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 md:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Các lĩnh vực hiệu chuẩn:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    {[
                      "Hiệu chuẩn lĩnh vực lực – độ cứng",
                      "Hiệu chuẩn lĩnh vực khối lượng", 
                      "Hiệu chuẩn lĩnh vực độ dài",
                      "Hiệu chuẩn lĩnh vực nhiệt",
                      "Hiệu chuẩn lĩnh vực hóa lý",
                      "Hiệu chuẩn lĩnh vực cơ",
                      "Hiệu chuẩn lĩnh vực áp suất",
                      "Hiệu chuẩn lĩnh vực dung tích – lưu lượng",
                      "Hiệu chuẩn lĩnh vực quang học – bức xạ",
                      "Hiệu chuẩn lĩnh vực điện"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 p-2 hover:bg-white/50 rounded-lg transition-colors duration-200">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 sm:mt-2.5"></div>
                        <span className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Information Paragraphs */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-white border-l-4 border-blue-500 pl-4 sm:pl-6 py-2 sm:py-3">
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                      Với năng lực hiểu rõ bản chất về kiểm định và hiệu chuẩn thiết bị đo lường, <span className="font-semibold text-blue-600">Intest</span> tự tin mang đến quý khách hàng một giải pháp dịch vụ toàn diện, đầy đủ và chính xác nhất cho các vấn đề liên quan đến máy móc thiết bị. Đội ngũ chuyên viên, kỹ thuật viên được đào tạo có chuyên môn, có chứng chỉ sẽ đến tận nơi để khảo sát các máy móc thiết bị trước khi hiệu chuẩn.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border border-green-100">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg md:text-xl font-semibold text-green-800 mb-2 sm:mb-3">
                          Cam kết chất lượng
                        </h4>
                        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                          Đến với <span className="font-semibold text-blue-600">Intest</span>, bạn sẽ được trải nghiệm dịch vụ chất lượng, tiết kiệm tối đa về chi phí với quy trình làm việc chuyên nghiệp và phục vụ tận tâm. Các dịch vụ hiệu chuẩn của chúng tôi đạt chứng chỉ tiêu chuẩn quốc tế <span className="font-bold text-green-600">ISO/IEC 17025: 2017</span>. Chính vì vậy, nếu bạn đang tìm đối tác hiệu chuẩn chính xác thì Intest chính là sự lựa chọn rất đáng cân nhắc.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
                    Liên hệ tư vấn
                  </button>
                  <button className="flex-1 bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl border-2 border-blue-600 hover:border-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
                    Xem dịch vụ
                  </button>
                </div>
              </div>

              {/* Image Section */}
              <div className="w-full lg:w-2/5 xl:w-1/3">
                <div className="sticky top-8">
                  <div className="relative group">
                    {/* Loading Placeholder */}
                    {!isImageLoaded && (
                      <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Main Image */}
                    <img
                      src={intro1}
                      alt="INTEST - Thiết bị hiệu chuẩn chuyên nghiệp"
                      onLoad={handleImageLoad}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className={`w-full h-auto rounded-2xl shadow-2xl transition-all duration-500 ${
                        isImageLoaded ? 'opacity-100' : 'opacity-0'
                      } ${
                        isHovering ? 'transform scale-105 shadow-3xl' : ''
                      }`}
                      loading="lazy"
                    />
                    
                    {/* Image Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl transition-opacity duration-300 ${
                      isHovering ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs sm:text-sm font-semibold text-blue-600">ISO/IEC 17025:2017</span>
                    </div>
                  </div>
                  
                  {/* Image Caption */}
                  <div className="mt-4 text-center">
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Thiết bị hiệu chuẩn hiện đại đạt tiêu chuẩn quốc tế
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Contact Info */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 sm:px-8 md:px-12 py-6 sm:py-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
                Liên hệ với chúng tôi để được tư vấn chi tiết về các dịch vụ hiệu chuẩn
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm sm:text-base text-gray-700">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Hotline: 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email hỗ trợ</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Phục vụ toàn quốc</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;