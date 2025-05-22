import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import images from "../utils/imageImports";

const { service1 } = images;

export default function Services() {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`/api/v1/services`);
        setNewsData(response.data.data.slice(0, 5)); // Hiển thị tối đa 5 item
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Không thể tải dữ liệu, vui lòng thử lại sau.");
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleNavigate = (serviceId) => {
    navigate(`/service/${serviceId}`);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 sm:py-12 md:py-16">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-blue-600"></div>
          <p className="mt-3 text-sm sm:text-base text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8 sm:py-12 md:py-16">
        <div className="text-center px-4">
          <p className="text-red-500 text-sm sm:text-base">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[60vh]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${service1})`,
          backgroundAttachment: window.innerWidth > 768 ? "scroll" : "scroll"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[26px] text-white font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center">
          <span
            className="block"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              letterSpacing: "1px"
            }}
          >
            DỊCH VỤ
          </span>
        </h2>

        {/* Services Grid */}
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {newsData.map((service, index) => (
              <div
                key={index}
                className="group bg-white bg-opacity-95 hover:bg-opacity-100 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer mx-auto w-full max-w-sm"
                onClick={() => handleNavigate(service._id || service.id)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {/* Image Container */}
                <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Image Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${hoverIndex === index ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className="text-[#051d33] text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-3 group-hover:text-gray-800 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Read More Indicator */}
                  <div className={`mt-2 sm:mt-3 flex items-center text-blue-600 text-xs sm:text-sm font-medium transition-all duration-300 ${hoverIndex === index ? 'opacity-100 translate-x-1' : 'opacity-0'}`}>
                    <span>Xem chi tiết</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: View All Button */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <button 
            className="bg-white bg-opacity-90 hover:bg-opacity-100 text-[#051d33] font-semibold py-2 sm:py-3 px-4 sm:px-6 md:px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            onClick={() => navigate('/services')}
          >
            Xem tất cả dịch vụ
          </button>
        </div>
      </div>
    </div>
  );
}