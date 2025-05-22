import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewSection() {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoadingMore(page > 1);
                const response = await axios.get(`/api/v1/news?page=${page}&limit=8`);
                
                if (page === 1) {
                    setNewsData(response.data);
                } else {
                    setNewsData((prevData) => ({
                        ...prevData,
                        data: [...prevData.data, ...response.data.data]
                    }));
                }
                
                // Check if there are more pages
                if (response.data.data?.length < 8) {
                    setHasMore(false);
                }
                
                setIsLoading(false);
                setLoadingMore(false);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Không thể tải dữ liệu, vui lòng thử lại sau.");
                setIsLoading(false);
                setLoadingMore(false);
            }
        };

        fetchNews();
    }, [page]);

    const handleNavigate = (newsId) => {
        navigate(`/news/${newsId}`);
        window.scrollTo(0, 0);
    };

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-red-600"></div>
                    <p className="mt-3 text-sm sm:text-base text-gray-600">Đang tải tin tức...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
                <div className="text-center px-4">
                    <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-red-500 text-sm sm:text-base mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition-colors duration-300"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
            {/* Title Section */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[26px] font-bold text-[#333] mb-2 sm:mb-4">
                    TIN TỨC
                </h2>
                <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full"></div>
            </div>

            {/* News Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {newsData.data?.map((news, index) => (
                        <article
                            key={`${news.id}-${index}`}
                            className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100"
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                            onClick={() => handleNavigate(news.id)}
                        >
                            {/* Image Container */}
                            <div className="relative h-48 sm:h-52 md:h-56 lg:h-48 xl:h-52 overflow-hidden">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                {/* Image Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Date Badge */}
                                <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-medium shadow-lg">
                                    Mới
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-5 md:p-6">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#222] leading-tight line-clamp-2 group-hover:text-red-600 transition-colors duration-300 mb-3">
                                    {news.title}
                                </h3>
                                
                                {/* Read More Link */}
                                <div className="flex items-center text-red-600 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <span>Đọc thêm</span>
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Load More Section */}
                {hasMore && (
                    <div className="text-center mt-8 sm:mt-10 md:mt-12">
                        <button
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            className="group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loadingMore ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                                    <span>Đang tải...</span>
                                </>
                            ) : (
                                <>
                                    <span>Trang sau</span>
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* No More Content Message */}
                {!hasMore && newsData.data?.length > 0 && (
                    <div className="text-center mt-8 sm:mt-10 md:mt-12">
                        <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm sm:text-base">
                            {/* <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg> */}
                            {/* Đã hiển thị tất cả tin tức */}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {(!newsData.data || newsData.data.length === 0) && !isLoading && (
                    <div className="text-center py-12 sm:py-16">
                        <svg className="mx-auto h-16 w-16 sm:h-20 sm:w-20 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <h3 className="text-lg sm:text-xl font-medium text-gray-600 mb-2">
                            Chưa có tin tức nào
                        </h3>
                        <p className="text-sm sm:text-base text-gray-500">
                            Vui lòng quay lại sau để xem tin tức mới nhất
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}