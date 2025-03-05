import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from 'lucide-react';

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [relatedNews, setRelatedNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Fetch news detail
    const fetchServiceDetail = async () => {
      try {
        const response = await axios.get(`/api/v1/news/${newsId}`);
        setService(response.data.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch related news
    const fetchRelatedNews = async () => {
      try {
        const response = await axios.get("/api/v1/news");
        setRelatedNews(response.data.data.slice(0, 5));
        setFilteredNews(response.data.data.slice(0, 5));
      } catch (err) {
        console.error("Error fetching related news:", err);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchServiceDetail();
    fetchRelatedNews();
  }, [newsId]);

  useEffect(() => {
    // Filter related news based on search query
    const filtered = relatedNews.filter((news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [searchQuery, relatedNews]);

  // Mobile layout
  if (isMobileView) {
    return (
      <div className="container mx-auto px-4 py-6 mt-[70px] bg-gray-50 min-h-screen">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-blue-600 mb-4"
        >
          <ArrowLeft className="mr-2" /> Quay lại
        </button>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* News Title */}
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              {service?.title || "Tin tức không có tiêu đề"}
            </h1>

            {/* News Image */}
            {service?.image && (
              <div 
                className="w-full h-64 bg-cover bg-center rounded-lg mb-4"
                style={{ backgroundImage: `url(${service.image})` }}
              />
            )}

            {/* News Content */}
            <div 
              className="prose max-w-full mb-6"
              dangerouslySetInnerHTML={{ __html: service?.content || "<p>Không có nội dung.</p>" }}
            />

            {/* Related News Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-center">Tin tức khác</h2>
              
              {/* Search Input */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Tìm kiếm tin tức..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Search className="absolute left-2 top-3 text-gray-400" size={20} />
              </div>

              {/* Related News List */}
              {newsLoading ? (
                <p className="text-center">Đang tải...</p>
              ) : (
                <div className="space-y-4">
                  {filteredNews.map((news) => (
                    <div 
                      key={news.id}
                      className="flex items-center border-b pb-2 cursor-pointer hover:bg-gray-50"
                      onClick={() => navigate(`/news/${news.id}`)}
                    >
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-20 h-16 object-cover rounded-md mr-4"
                      />
                      <p className="text-sm font-semibold">{news.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="container mx-auto px-4 py-16 mt-[90px] bg-gray-50 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto">
          {/* Main News Content */}
          <div className="w-2/3 p-8 border-r">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              {service?.title || "Tin tức không có tiêu đề"}
            </h1>

            {service?.image && (
              <div 
                className="w-full h-96 bg-cover bg-center rounded-lg mb-6"
                style={{ backgroundImage: `url(${service.image})` }}
              />
            )}

            <div 
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: service?.content || "<p>Không có nội dung.</p>" }}
            />
          </div>

          {/* Related News Section */}
          <div className="w-1/3 p-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-6 text-center">Tin tức khác</h2>
            
            {/* Search Input */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Tìm kiếm tin tức..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Search className="absolute left-2 top-3 text-gray-400" size={20} />
            </div>

            {/* Related News List */}
            {newsLoading ? (
              <p className="text-center">Đang tải...</p>
            ) : (
              <div className="space-y-4">
                {filteredNews.map((news) => (
                  <div 
                    key={news.id}
                    className="flex items-center border-b pb-4 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
                    onClick={() => navigate(`/news/${news.id}`)}
                  >
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-24 h-20 object-cover rounded-md mr-4"
                    />
                    <p className="text-md font-semibold">{news.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetailPage;