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
                const response = await axios.get(`api/api/v1/services`);
                setNewsData(response.data.data.slice(0, 5)); // Hiển thị tối đa 4 item
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
        navigate(`/services/${newsId}`);
        window.scrollTo(0, 0);
    };

    if (isLoading) {
        return <div style={{ textAlign: "center", padding: "20px" }}>Đang tải...</div>;
    }

    if (error) {
        return <div style={{ textAlign: "center", padding: "20px", color: "red" }}>{error}</div>;
    }

    return (
        <div
            style={{
                width: "100%",
                height: "60vh",
                backgroundImage: `url(${service1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "scroll",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
            }}
        >
            <h2
                style={{
                    fontSize: "26px",
                    color: "#fff",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Làm nổi bật tiêu đề
                }}
            >
                DỊCH VỤ
            </h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px",
                    width: "80%", // Đảm bảo vừa phải
                }}
            >
                {newsData.map((news, index) => (
                    <div
                        key={index}
                        style={{
                            borderRadius: "10px",
                            overflow: "hidden",
                            textAlign: "center",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            transform: hoverIndex === index ? "scale(1.05)" : "scale(1)",
                            boxShadow:
                                hoverIndex === index
                                    ? "0 8px 16px rgba(0, 0, 0, 0.3)"
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
                                height: "250px",
                                objectFit: "cover",
                                transition: "transform 0.3s ease",
                                transform: hoverIndex === index ? "scale(1.1)" : "scale(1)",
                                cursor: "pointer",
                                borderRadius: "10px",
                            }}
                            onClick={() => handleNavigate(news.id)}
                        />
                        <h3
                            style={{
                                fontSize: "18px",
                                color: "#fff",
                                marginTop: "10px",
                                cursor: "pointer",
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                            }}
                            onClick={() => handleNavigate(news.id)}
                        >
                            {news.title}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
