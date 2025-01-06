import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Để lấy id từ URL

const ServiceDetailPage = () => {
  const { serviceId } = useParams(); // Lấy id từ URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await axios.get(`/v1/posts/${serviceId}`);
        setService(response.data.data); // Dữ liệu dịch vụ chi tiết
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [serviceId]);

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
          <h1>{service?.title}</h1>
          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundImage: `url(${service?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          ></div>
          <p>{service?.content}</p>
        </div>
      )}
    </div>
  );
};

export default ServiceDetailPage;
