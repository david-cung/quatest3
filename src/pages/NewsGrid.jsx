import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NewsGrid = () => {
  const navigate = (path) => {
    console.log(`Navigate to: ${path}`);
    // Use window.location for actual navigation
    window.location.href = path;
  };
  
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        
        const offset = (currentPage - 1) * itemsPerPage;
        
        try {
          const response = await fetch('api/v1/news', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          const {data} = await response.json();
          
          // Check if API returns new format with pagination info
          if (data.data && typeof data.total !== 'undefined') {
            // New API format
            setNewsItems(data.data || []);
            setTotalItems(data.total || 0);
            setTotalPages(data.totalPages || Math.ceil((data.total || 0) / itemsPerPage));
          } else if (Array.isArray(data.data)) {
            // Old API format - only data array
            setNewsItems(data.data);
            // Fallback: assume there are more pages if we get full limit
            setTotalItems(data.data.length);
            setTotalPages(data.data.length < itemsPerPage ? currentPage : currentPage + 1);
          } else if (Array.isArray(data)) {
            // Very old format - direct array
            setNewsItems(data);
            setTotalItems(data.length);
            setTotalPages(data.length < itemsPerPage ? currentPage : currentPage + 1);
          } else {
            throw new Error('Invalid API response format');
          }
          
          setError(null);
        } catch (apiError) {
          console.warn('API call failed, using fallback data:', apiError);
          
          // Fallback with mock data for demo
          const mockNews = [
            {
              id: 1,
              title: "INTEST công bố dịch vụ hiệu chuẩn mới cho ngành y tế",
              description: "Công ty cổ phần Kiểm định Hiệu chuẩn Đo lường Khu vực 2 vừa ra mắt gói dịch vụ hiệu chuẩn chuyên biệt cho các thiết bị y tế, đáp ứng tiêu chuẩn quốc tế.",
              image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
              category: "Dịch vụ mới"
            },
            {
              id: 2,
              title: "Đào tạo kỹ thuật viên hiệu chuẩn chuyên nghiệp",
              description: "Khóa học đào tạo kỹ thuật viên hiệu chuẩn với chứng chỉ quốc tế, trang bị kiến thức và kỹ năng thực hành về đo lường.",
              image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
              category: "Đào tạo"
            },
            {
              id: 3,
              title: "INTEST mở rộng phòng lab hiệu chuẩn tại TP.HCM",
              description: "Phòng lab mới được trang bị thiết bị hiện đại nhất, nâng cao năng lực phục vụ khách hàng khu vực phía Nam.",
              image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
              category: "Tin công ty"
            },
            {
              id: 4,
              title: "Hội thảo về tiêu chuẩn ISO 17025:2017",
              description: "Sự kiện quan trọng về cập nhật tiêu chuẩn mới nhất trong lĩnh vực phòng thí nghiệm và hiệu chuẩn.",
              image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
              category: "Sự kiện"
            },
            {
              id: 5,
              title: "Dịch vụ hiệu chuẩn thiết bị môi trường",
              description: "INTEST giới thiệu dịch vụ hiệu chuẩn các thiết bị đo môi trường, hỗ trợ doanh nghiệp tuân thủ quy định về môi trường.",
              image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
              category: "Môi trường"
            },
            {
              id: 6,
              title: "Chứng nhận năng lực theo VILAS",
              description: "INTEST chính thức được công nhận năng lực hiệu chuẩn theo hệ thống VILAS của Việt Nam.",
              image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
              category: "Chứng nhận"
            },
            {
              id: 7,
              title: "Hợp tác với các trường đại học trong đào tạo",
              description: "INTEST ký kết hợp tác với nhiều trường đại học để đào tạo nguồn nhân lực chất lượng cao cho ngành đo lường.",
              image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop",
              category: "Hợp tác"
            },
            {
              id: 8,
              title: "Cập nhật công nghệ đo lường mới nhất",
              description: "Đầu tư vào các công nghệ đo lường tiên tiến nhất để nâng cao chất lượng dịch vụ hiệu chuẩn.",
              image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
              category: "Công nghệ"
            },
            {
              id: 9,
              title: "Mở rộng thị trường ra khu vực Đông Nam Á",
              description: "INTEST có kế hoạch mở rộng dịch vụ hiệu chuẩn ra các nước trong khu vực Đông Nam Á.",
              image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
              category: "Mở rộng"
            },
            {
              id: 10,
              title: "Giải thưởng doanh nghiệp xuất sắc năm 2024",
              description: "INTEST vinh dự nhận giải thưởng doanh nghiệp xuất sắc trong lĩnh vực đo lường hiệu chuẩn.",
              image: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=400&h=300&fit=crop",
              category: "Giải thưởng"
            }
          ];

          // Simulate pagination with mock data
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const paginatedData = mockNews.slice(startIndex, endIndex);
          
          setNewsItems(paginatedData);
          setTotalItems(mockNews.length);
          setTotalPages(Math.ceil(mockNews.length / itemsPerPage));
          
          setError(null);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news. Please try again later.');
        setLoading(false);
        console.error('Error fetching news:', err);
      }
    };

    fetchNews();
  }, [currentPage]);

  const handleNewsClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  const handlePageChange = (newPage) => {
    console.log('Changing to page:', newPage, 'Current:', currentPage, 'Total:', totalPages);
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    // Always show pagination controls when there are items
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`px-3 py-2 mx-1 text-sm font-medium rounded-lg border transition-colors ${
          currentPage <= 1
            ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-700'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
    );

    // First page and ellipsis
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-3 py-2 mx-1 text-sm font-medium text-gray-500">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 text-sm font-medium rounded-lg transition-colors ${
            currentPage === i
              ? 'text-white bg-blue-600 border border-blue-600'
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-3 py-2 mx-1 text-sm font-medium text-gray-500">
            ...
          </span>
        );
      }
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-3 py-2 mx-1 text-sm font-medium rounded-lg border transition-colors ${
          currentPage >= totalPages
            ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-700'
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    );

    return pages;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải tin tức...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 mt-24">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-10 text-[#032c57]">
        Tin Tức
        <div className="h-[2px] sm:h-[3px] bg-blue-500 w-16 sm:w-24 mx-auto mt-2 sm:mt-3"></div>
      </h2>

      {/* Debug info */}
      {/* <div className="mb-8 text-center text-sm text-gray-500 bg-gray-50 p-4 rounded">
        <div>Items: {newsItems.length} | Total: {totalItems} | Pages: {totalPages} | Current: {currentPage}</div>
      </div> */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col sm:flex-row cursor-pointer hover:shadow-xl transition-shadow duration-300 h-36 sm:h-40"
            onClick={() => handleNewsClick(item.id)}
          >
            <div className="w-full sm:w-2/5 h-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop';
                }}
              />
            </div>
            <div className="w-full sm:w-3/5 p-2 sm:p-3 flex flex-col justify-center overflow-hidden">
              <span className="text-blue-600 font-semibold text-xs mb-1 block truncate">
                {item.category || 'Tin Tức'}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-1 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-xs hidden sm:line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Pagination - Always show when there are items */}
      {totalItems > 0 && (
        <div className="mt-8 mb-16 flex flex-col items-center">
          <div className="flex flex-wrap justify-center items-center mb-4">
            {renderPagination()}
          </div>
          {/* <div className="text-sm text-gray-500 text-center">
            <p>Hiển thị {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} trong tổng số {totalItems} tin tức</p>
            <p>Trang {currentPage} / {totalPages}</p>
          </div> */}
        </div>
      )}

      {/* Empty State */}
      {newsItems.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Chưa có tin tức nào
          </h3>
          <p className="text-gray-500">
            Tin tức sẽ được cập nhật sớm
          </p>
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default NewsGrid;