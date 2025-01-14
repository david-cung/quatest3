import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Để lấy id từ URL

const NewsDetailPage = () => {
  const { newsId } = useParams(); // Lấy id từ URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [relatedNews, setRelatedNews] = useState([]); // Danh sách tin tức liên quan
  const [filteredNews, setFilteredNews] = useState([]); // Tin tức liên quan sau khi tìm kiếm
  const [newsLoading, setNewsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm

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
        setFilteredNews(response.data.data.slice(0, 5)); // Khởi tạo với 5 tin tức đầu tiên
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
    // Filter tin tức liên quan khi người dùng nhập vào tìm kiếm
    const filtered = relatedNews.filter((news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [searchQuery, relatedNews]);

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
              minHeight: "400px", // Chiều cao tối thiểu
            }}
          >
            <h1 style={{ marginBottom: "20px", fontSize: "32px", fontWeight: "bold", color: 'black' }}>
              {service?.title || "Tin tức không có tiêu đề"} {/* Fallback nếu thiếu title */}
            </h1>
            <div
              style={{
                marginBottom: "20px",
                fontSize: "18px",
                lineHeight: "1.6",
                textAlign: "left",
                color: "#333",
                minHeight: "200px", // Nội dung luôn có khoảng trống
              }}
              dangerouslySetInnerHTML={{ __html: service?.content || "<p>Không có nội dung.</p>" }}
            ></div>
            {service?.image && (
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
            )}
          </div>

          {/* Phần danh sách tin tức liên quan */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              backgroundColor: "#fff", // Cập nhật màu nền thành trắng
            }}
          >
            <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
              Tin tức khác
            </h2>

            {/* Tính năng tìm kiếm */}
            <input
              type="text"
              placeholder="Tìm kiếm tin tức..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "90%",
                padding: "10px",
                fontSize: "16px",
                marginBottom: "20px",
                marginRight: "20px",
                paddingRight: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                backgroundColor: 'whitesmoke'
              }}
            />

            {newsLoading ? (
              <p>Đang tải...</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {filteredNews.map((news) => (
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
                      alt={news.title || "Không có tiêu đề"}
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
                      {news.title || "Không có tiêu đề"}
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
