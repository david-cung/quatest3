import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Services() {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`/v1/services`);
                if (page === 1) {
                    setNewsData(response.data);
                } else {
                    setNewsData((prevData) => [...prevData, ...response.data]);
                }
                console.log("Success", response.data);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Không thể tải dữ liệu, vui lòng thử lại sau.");
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [page]);

    const handleNavigate = (newsId) => {
        navigate(`/news/${newsId}`);
        window.scrollTo(0, 0);
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    if (isLoading) {
        return <div style={{ textAlign: "center", padding: "20px" }}>Đang tải...</div>;
    }

    if (error) {
        return <div style={{ textAlign: "center", padding: "20px", color: "red" }}>{error}</div>;
    }

    return (
        <div style={{ marginTop: "40px", padding: "20px 0", backgroundColor: "#fff" }}>
            <h2
                style={{
                    fontSize: "26px",
                    color: "#333",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    textAlign: "center",
                    letterSpacing: "1.5px", // Tăng khoảng cách chữ
                }}
            >
                DỊCH VỤ
            </h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                {newsData.data?.map((news, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            overflow: "hidden",
                            textAlign: "center",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            transform: hoverIndex === index ? "scale(1.05)" : "scale(1)",
                            boxShadow:
                                hoverIndex === index
                                    ? "0 8px 16px rgba(0, 0, 0, 0.2)"
                                    : "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                        <img
                            src={news.image}
                            alt={news.title}
                            style={{
                                width: "100%",
                                height: "250px", // Tăng kích thước hình ảnh
                                objectFit: "cover",
                                transition: "transform 0.3s ease",
                                transform: hoverIndex === index ? "scale(1.1)" : "scale(1)",
                                cursor: "pointer",
                            }}
                            onClick={() => handleNavigate(news.id)}
                        />
                        <h3
                            style={{
                                fontSize: "22px", // Tăng kích thước chữ tiêu đề
                                color: "#222",
                                padding: "15px",
                                margin: "0",
                                fontWeight: "bold",
                                cursor: "pointer",
                                letterSpacing: "1.2px", // Tăng khoảng cách chữ
                            }}
                            onClick={() => handleNavigate(news.id)}
                        >
                            {news.title}
                        </h3>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button
                    style={{
                        padding: "12px 24px", // Tăng kích thước nút
                        backgroundColor: "#c21f1f",
                        color: "#fff",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                        letterSpacing: "1px", // Tăng khoảng cách chữ
                    }}
                    onClick={handleLoadMore}
                >
                    Trang sau »
                </button>
            </div>
        </div>
    );
}
