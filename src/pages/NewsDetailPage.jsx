import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Để lấy id từ URL

const NewsDetailPage = () => {
  const { newsId } = useParams(); // Lấy id từ URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [relatedNews, setRelatedNews] = useState([]); // Danh sách tin tức liên quan
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    // Fetch chi tiết tin tức
    const fetchServiceDetail = async () => {
      try {
        const response = await axios.get(`/v1/news/${newsId}`);
        setService(response.data.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch danh sách tin tức
    const fetchRelatedNews = async () => {
      try {
        const response = await axios.get("/v1/news");
        setRelatedNews(response.data.data.slice(0, 5)); // Lấy 5 tin tức đầu tiên
      } catch (err) {
        console.error("Error fetching related news:", err);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchServiceDetail();
    fetchRelatedNews();
  }, [newsId]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
        backgroundColor: "#f7f7f7", // Màu nền xám bên ngoài
        minHeight: "100vh",
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div
          style={{
            display: "flex",
            maxWidth: "1200px",
            backgroundColor: "#fff", // Màu nền bên trong
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {/* Phần chi tiết tin tức */}
          <div
            style={{
              flex: 2,
              padding: "20px",
              borderRight: "1px solid #ddd",
            }}
          >
            <h1 style={{ marginBottom: "20px", fontSize: "32px", fontWeight: "bold" }}>
              {service?.title}
            </h1>
            <div
              style={{
                marginBottom: "20px",
                fontSize: "18px",
                lineHeight: "1.6",
                textAlign: "left",
                color: "#333",
              }}
              dangerouslySetInnerHTML={{ __html: service?.content }}
            ></div>
            <div
              style={{
                width: "100%",
                height: "400px",
                backgroundImage: `url(${service?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
              }}
            ></div>
          </div>

          {/* Phần danh sách tin tức liên quan */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
              Tin tức khác
            </h2>
            {newsLoading ? (
              <p>Đang tải...</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {relatedNews.map((news) => (
                  <li
                    key={news.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "15px",
                      cursor: "pointer",
                      borderBottom: "1px solid #ddd",
                      paddingBottom: "10px",
                    }}
                  >
                    <img
                      src={news.image}
                      alt={news.title}
                      style={{
                        width: "80px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        marginRight: "10px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#333",
                        margin: 0,
                      }}
                    >
                      {news.title}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetailPage;
