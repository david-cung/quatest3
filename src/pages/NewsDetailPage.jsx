import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ImageIcon } from 'lucide-react';

// Custom hook for responsive design
const useResponsive = () => {
  const [isMobileView, setIsMobileView] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobileView;
};

// Custom hook for debounced search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Loading component
const LoadingSpinner = ({ size = "h-10 w-10" }) => (
  <div className="flex justify-center items-center">
    <div className={`animate-spin rounded-full ${size} border-t-2 border-blue-500`} />
  </div>
);

// Error component
const ErrorMessage = ({ message }) => (
  <div className="text-center p-6">
    <p className="text-red-500 text-lg">{message}</p>
  </div>
);

// News image component with fallback
const NewsImage = ({ src, alt, className, fallbackIcon: FallbackIcon = ImageIcon }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <FallbackIcon className="text-gray-400" size={40} />
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`${className} bg-gray-200 flex items-center justify-center absolute inset-0`}>
          <LoadingSpinner size="h-6 w-6" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </div>
  );
};

// Related news item component
const RelatedNewsItem = ({ news, onClick, isMobile }) => (
  <div 
    className={`flex items-center border-b pb-${isMobile ? '2' : '4'} cursor-pointer hover:bg-gray-${isMobile ? '50' : '100'} rounded-lg p-2 transition-colors duration-200`}
    onClick={() => onClick(news.id)}
  >
    <NewsImage
      src={news.image}
      alt={news.title}
      className={`${isMobile ? 'w-20 h-16' : 'w-24 h-20'} object-cover rounded-md mr-4 flex-shrink-0`}
    />
    <p className={`${isMobile ? 'text-sm' : 'text-md'} font-semibold line-clamp-2`}>
      {news.title}
    </p>
  </div>
);

// Related news section component
const RelatedNewsSection = ({ 
  relatedNews, 
  searchQuery, 
  onSearchChange, 
  onNewsClick, 
  isLoading, 
  isMobile 
}) => {
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  const filteredNews = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return relatedNews;
    
    return relatedNews.filter((news) =>
      news.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [relatedNews, debouncedSearchQuery]);

  return (
    <div className={isMobile ? "mt-8" : "w-1/3 p-6 bg-gray-50"}>
      <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-${isMobile ? '4' : '6'} text-center`}>
        Tin tức khác
      </h2>
      
      {/* Search Input */}
      <div className={`relative mb-${isMobile ? '4' : '6'}`}>
        <input
          type="text"
          placeholder="Tìm kiếm tin tức..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-2 pl-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <Search className="absolute left-2 top-3 text-gray-400" size={20} />
      </div>

      {/* Related News List */}
      {isLoading ? (
        <LoadingSpinner />
      ) : filteredNews.length === 0 ? (
        <p className="text-center text-gray-500">
          {searchQuery ? "Không tìm thấy tin tức phù hợp" : "Không có tin tức liên quan"}
        </p>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredNews.map((news) => (
            <RelatedNewsItem
              key={news.id}
              news={news}
              onClick={onNewsClick}
              isMobile={isMobile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main news content component
const MainNewsContent = ({ service, isMobile }) => (
  <div className={isMobile ? "bg-white rounded-lg shadow-md p-6" : "w-2/3 p-8 border-r"}>
    <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-${isMobile ? '4' : '6'} text-gray-800`}>
      {service?.title || "Tin tức không có tiêu đề"}
    </h1>

    {service?.image && (
      <NewsImage
        src={service.image}
        alt={service.title}
        className={`w-full ${isMobile ? 'h-64' : 'h-96'} object-cover rounded-lg mb-${isMobile ? '4' : '6'}`}
      />
    )}

    <div 
      className="prose max-w-full"
      dangerouslySetInnerHTML={{ 
        __html: service?.content || "<p>Không có nội dung.</p>" 
      }}
    />
  </div>
);

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const isMobileView = useResponsive();

  // States
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Memoized handlers
  const handleBackClick = useCallback(() => navigate(-1), [navigate]);
  const handleNewsClick = useCallback((id) => navigate(`/news/${id}`), [navigate]);
  const handleSearchChange = useCallback((query) => setSearchQuery(query), []);

  // API calls
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [newsResponse, relatedResponse] = await Promise.all([
          axios.get(`/api/v1/news/${newsId}`),
          axios.get("/api/v1/news")
        ]);

        if (isMounted) {
          setService(newsResponse.data.data);
          const related = relatedResponse.data.data.data
            .filter(news => news.id !== parseInt(newsId))
            .slice(0, 5);
          setRelatedNews(related);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message || "Có lỗi xảy ra");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setNewsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [newsId]);

  // Loading state
  if (loading) {
    return (
      <div className={`container mx-auto px-4 py-${isMobileView ? '6' : '16'} mt-[${isMobileView ? '70' : '90'}px] bg-gray-50 min-h-screen`}>
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`container mx-auto px-4 py-${isMobileView ? '6' : '16'} mt-[${isMobileView ? '70' : '90'}px] bg-gray-50 min-h-screen`}>
        <ErrorMessage message={error} />
      </div>
    );
  }

  // Mobile layout
  if (isMobileView) {
    return (
      <div className="container mx-auto px-4 py-6 mt-[70px] bg-gray-50 min-h-screen">
        {/* Back Button */}
        <button 
          onClick={handleBackClick} 
          className="flex items-center text-blue-600 mb-4 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} /> Quay lại
        </button>

        <MainNewsContent service={service} isMobile={true} />
        
        <RelatedNewsSection
          relatedNews={relatedNews}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onNewsClick={handleNewsClick}
          isLoading={newsLoading}
          isMobile={true}
        />
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="container mx-auto px-4 py-16 mt-[90px] bg-gray-50 min-h-screen">
      <div className="flex bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto">
        <MainNewsContent service={service} isMobile={false} />
        
        <RelatedNewsSection
          relatedNews={relatedNews}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onNewsClick={handleNewsClick}
          isLoading={newsLoading}
          isMobile={false}
        />
      </div>
    </div>
  );
};

export default NewsDetailPage;