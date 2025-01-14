import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Để lấy id từ URL

const NewsDetailPage = () => {
  const { newsId } = useParams(); // Lấy id từ URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      console.log("Fetching service detail", newsId);
      try {
        const response = await axios.get(`/v1/news/${newsId}`);
        setService(response.data.data); // Dữ liệu dịch vụ chi tiết
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [newsId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "120px",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div style={{ maxWidth: "800px", padding: "20px", textAlign: "center" }}>
          {/* Hiển thị Title */}
          <h1 style={{ marginBottom: "20px", fontSize: "32px", fontWeight: "bold" }}>
            {service?.title}
          </h1>

          {/* Render Content với dangerouslySetInnerHTML */}
          <div
            style={{ marginBottom: "20px", fontSize: "18px", lineHeight: "1.6", textAlign: "left", color: "#333" }}
            dangerouslySetInnerHTML={{ __html: service?.content }}
          ></div>

          {/* Hiển thị Image */}
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
      )}
    </div>
  );
};

export default NewsDetailPage;
