import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import images from "../utils/imageImports";

const { service1 } = images;

// Memoized Service Card Component
const ServiceCard = ({ service, index, isHovered, onHover, onLeave, onClick }) => {
  return (
    <div
      className="group bg-white/95 backdrop-blur-sm hover:bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 cursor-pointer mx-auto w-full max-w-sm border border-white/20"
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image Container with enhanced effects */}
      <div className="relative h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
        />
        
        {/* Dynamic overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100 from-black/60' : 'opacity-70'
        }`}></div>
        
        {/* Floating icon indicator */}
        <div className={`absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'scale-110 bg-white/30' : 'scale-100'
        }`}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>

      {/* Content with enhanced typography */}
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="text-gray-800 text-base sm:text-lg md:text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
          {service.title}
        </h3>
        
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-4 group-hover:text-gray-700 transition-colors duration-300">
          {service.description}
        </p>
        
        {/* Enhanced CTA */}
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-60 transform translate-y-2'
        }`}>
          <span className="text-blue-600 text-sm font-semibold">Xem chi tiết</span>
          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
            <svg className="w-4 h-4 text-blue-600 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="bg-white/90 rounded-2xl overflow-hidden shadow-lg animate-pulse">
        <div className="h-40 bg-gray-300"></div>
        <div className="p-5">
          <div className="h-4 bg-gray-300 rounded mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

// Error Component
const ErrorDisplay = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center max-w-md">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Có lỗi xảy ra</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <button 
        onClick={onRetry}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300"
      >
        Thử lại
      </button>
    </div>
  </div>
);

export default function Services() {
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const navigate = useNavigate();

  // Memoize API call
  const fetchServices = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`/api/v1/services`);
      setServicesData(response.data.data.slice(0, 5));
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Không thể tải dữ liệu dịch vụ. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Memoize handlers
  const handleServiceClick = useCallback((serviceId) => {
    navigate(`/service/${serviceId}`);
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleViewAll = useCallback(() => {
    navigate('/services');
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleMouseEnter = useCallback((index) => {
    setHoverIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

  // Memoize background style
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${service1})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }), []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Enhanced Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={backgroundStyle}
      >
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/50 to-black/70"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated particles effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
        {/* Enhanced Title Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white/90 text-sm font-medium tracking-wider uppercase">
              Dịch vụ của chúng tôi
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
              DỊCH VỤ
            </span>
          </h2>
          
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Khám phá các dịch vụ hiệu chuẩn chuyên nghiệp và chất lượng cao
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mt-6"></div>
        </div>

        {/* Services Content */}
        <div className="w-full max-w-7xl">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorDisplay error={error} onRetry={fetchServices} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
              {servicesData.map((service, index) => (
                <ServiceCard
                  key={service._id || service.id || index}
                  service={service}
                  index={index}
                  isHovered={hoverIndex === index}
                  onHover={() => handleMouseEnter(index)}
                  onLeave={handleMouseLeave}
                  onClick={() => handleServiceClick(service._id || service.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Enhanced CTA Button */}
        {!isLoading && !error && (
          <div className="mt-12 sm:mt-16">
            <button 
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 sm:px-12 rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg"
              onClick={handleViewAll}
            >
              <span className="relative z-10 flex items-center">
                Xem tất cả dịch vụ
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}