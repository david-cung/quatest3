import { useEffect, useState, useCallback, useMemo } from "react";
import { Trash2, Edit, Plus, Eye, Calendar, Tag, Search, Filter, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/v1/news", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        setNews(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        // Fallback to mock data for demo
        setNews([
          {
            id: 1,
            title: "Ra mắt sản phẩm công nghệ mới",
            category: "Công nghệ",
            image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop",
            updatedAt: "2024-01-22T10:30:00Z"
          },
          {
            id: 2,
            title: "Xu hướng marketing 2024",
            category: "Marketing",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
            updatedAt: "2024-01-20T14:15:00Z"
          },
          {
            id: 3,
            title: "Chiến lược kinh doanh hiệu quả",
            category: "Kinh doanh",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
            updatedAt: "2024-01-18T09:45:00Z"
          },
          {
            id: 4,
            title: "Đổi mới sáng tạo trong doanh nghiệp",
            category: "Đổi mới",
            image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
            updatedAt: "2024-01-25T16:20:00Z"
          }
        ]);
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Memoized filtered and sorted news for performance
  const filteredNews = useMemo(() => {
    let filtered = news.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || item.category === selectedCategory)
    );

    // Sort news
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      } else if (sortBy === "oldest") {
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [news, searchTerm, selectedCategory, sortBy]);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = [...new Set(news.map(item => item.category))];
    return cats;
  }, [news]);

  const handleDelete = useCallback((id) => {
    setShowDeleteConfirmation(id);
  }, []);

  const confirmDelete = useCallback(async (id) => {
    try {
      const response = await fetch(`/api/v1/news/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete news');
      }
      
      setNews(prevNews => prevNews.filter((item) => item.id !== id));
      setShowDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting news:", error);
      // For demo purposes, still remove from UI
      setNews(prevNews => prevNews.filter((item) => item.id !== id));
      setShowDeleteConfirmation(null);
    }
  }, []);

  const cancelDelete = useCallback(() => {
    setShowDeleteConfirmation(null);
  }, []);

  const handleEdit = useCallback((id) => {
    navigate(`/edit-news/${id}`);
  }, [navigate]);

  const handleAddNews = useCallback(() => {
    navigate('/add-news');
  }, [navigate]);

  const handleViewDetail = useCallback((id) => {
    navigate(`/news/${id}`);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải tin tức...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 animate-fadeInDown">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 backdrop-blur-sm bg-opacity-90">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                  <Newspaper className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                  Quản lý Tin tức
                </h1>
                <p className="text-gray-600">
                  Tổng cộng {filteredNews.length} tin tức
                </p>
              </div>
              <button
                onClick={handleAddNews}
                className="group relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Thêm tin tức
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm tin tức..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Category Filter */}
                <div className="relative flex-1">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="all">Tất cả danh mục</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 sm:min-w-[150px]"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="alphabetical">A-Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid gap-4 md:gap-6">
          {/* Mobile Layout */}
          <div className="block md:hidden">
            {filteredNews.map((newsItem, index) => (
              <div
                key={newsItem.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex">
                  {/* Image */}
                  <div 
                    className="relative w-24 h-24 flex-shrink-0 cursor-pointer"
                    onClick={() => handleViewDetail(newsItem.id)}
                  >
                    <img
                      src={newsItem.image}
                      alt={newsItem.title}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white opacity-0 hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-3">
                    <div className="flex items-center gap-1 mb-2">
                      <Tag className="w-3 h-3 text-purple-500" />
                      <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                        {newsItem.category}
                      </span>
                    </div>
                    
                    <h3 
                      className="font-bold text-gray-800 text-sm leading-tight mb-2 cursor-pointer hover:text-purple-600 transition-colors line-clamp-2"
                      onClick={() => handleViewDetail(newsItem.id)}
                    >
                      {newsItem.title}
                    </h3>
                    
                    <div className="flex items-center gap-1 text-gray-500 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs">
                        {new Date(newsItem.updatedAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    
                    {/* Mobile Action Buttons */}
                    {showDeleteConfirmation === newsItem.id ? (
                      <div className="animate-fadeIn">
                        <p className="text-center text-gray-700 mb-2 font-medium text-xs">
                          Bạn có chắc chắn muốn xoá?
                        </p>
                        <div className="flex gap-1">
                          <button
                            onClick={() => confirmDelete(newsItem.id)}
                            className="flex-1 px-2 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors"
                          >
                            Xác nhận
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="flex-1 px-2 py-1 bg-gray-500 text-white rounded text-xs font-medium hover:bg-gray-600 transition-colors"
                          >
                            Huỷ
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleViewDetail(newsItem.id)}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600 transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          Xem
                        </button>
                        <button
                          onClick={() => handleEdit(newsItem.id)}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-amber-500 text-white rounded text-xs font-medium hover:bg-amber-600 transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(newsItem.id)}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          Xoá
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((newsItem, index) => (
              <div
                key={newsItem.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div 
                  className="relative overflow-hidden h-48 cursor-pointer"
                  onClick={() => handleViewDetail(newsItem.id)}
                >
                  <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetail(newsItem.id);
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white/30"
                  >
                    <Eye className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                      {newsItem.category}
                    </span>
                  </div>

                  <h3 
                    className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300 cursor-pointer line-clamp-2"
                    onClick={() => handleViewDetail(newsItem.id)}
                  >
                    {newsItem.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(newsItem.updatedAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  {showDeleteConfirmation === newsItem.id ? (
                    <div className="animate-fadeIn">
                      <p className="text-center text-gray-700 mb-4 font-medium">
                        Bạn có chắc chắn muốn xoá?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => confirmDelete(newsItem.id)}
                          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 font-medium"
                        >
                          Xác nhận
                        </button>
                        <button
                          onClick={cancelDelete}
                          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-200 font-medium"
                        >
                          Huỷ
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetail(newsItem.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 font-medium text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Xem
                      </button>
                      <button
                        onClick={() => handleEdit(newsItem.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transform hover:scale-105 transition-all duration-200 font-medium text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(newsItem.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 font-medium text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Xoá
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && !isLoading && (
          <div className="text-center py-12 animate-fadeIn">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Newspaper className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
              {searchTerm || selectedCategory !== "all" ? "Không tìm thấy tin tức" : "Chưa có tin tức nào"}
            </h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base px-4">
              {searchTerm || selectedCategory !== "all" 
                ? "Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc"
                : "Hãy thêm tin tức đầu tiên của bạn"
              }
            </p>
            {!searchTerm && selectedCategory === "all" && (
              <button
                onClick={handleAddNews}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200"
              >
                Thêm tin tức ngay
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}