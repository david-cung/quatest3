import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NewsGrid = () => {
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/v1/news', {
          params: { page: currentPage, limit: 4 }
        });
        setNewsItems(response.data.data);
        setTotalPages(response.data.length);
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
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 mt-24">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-10 text-[#032c57]">
        Tin Tức
        <div className="h-[2px] sm:h-[3px] bg-blue-500 w-16 sm:w-24 mx-auto mt-2 sm:mt-3"></div>
      </h2>
      
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

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 sm:mt-8 lg:mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 sm:p-2 mx-1 sm:mx-2 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded text-sm sm:text-base">
          {currentPage}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 sm:p-2 mx-1 sm:mx-2 disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default NewsGrid;