import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewSection() {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(null);

    const navigate = useNavigate(); // Khởi tạo hook để điều hướng

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("/v1/news");
                setNewsData(response.data);
                console.log("Success", response.data);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Không thể tải dữ liệu, vui lòng thử lại sau.");
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    const handleNavigate = (newsId) => {
        console.log("HandleNavigate", newsId);
        navigate(`/news/${newsId}`); // Điều hướng tới trang chi tiết
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
                }}
            >
                TIN TỨC
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
                {newsData?.data.map((news, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
                                height: "200px",
                                objectFit: "cover",
                                transition: "transform 0.3s ease",
                                transform: hoverIndex === index ? "scale(1.1)" : "scale(1)",
                                cursor: "pointer",
                            }}
                            onClick={() => handleNavigate(news.id)} // Điều hướng khi click ảnh
                        />
                        <h3
                            style={{
                                fontSize: "20px",
                                color: "#222",
                                padding: "15px",
                                margin: "0",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                            onClick={() => handleNavigate(news.id)} // Điều hướng khi click tiêu đề
                        >
                            {news.title}
                        </h3>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#c21f1f",
                        color: "#fff",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                    }}
                >
                    Trang sau »
                </button>
            </div>
        </div>
    );
}
