import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/v1/services");
        setServices(response.data); // Assuming the API returns a list of services
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleReadMore = (serviceId) => {
    navigate(`/service/${serviceId}`); // Navigate to the service detail page
  };

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
      <div style={{ textAlign: "center", marginBottom: "40px", width: "100%" }}>
        <h1 style={{ fontSize: "36px", color: "#0056a8", margin: 0 }}>
          Dịch vụ 
        </h1>
        <p style={{ fontSize: "18px", color: "#555", margin: "10px 0 0" }}>
          INTEST 3 thực hiện các hoạt động cung cấp dịch vụ kỹ thuật theo các
          lĩnh vực tiêu chuẩn đo lường chất lượng.
        </p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
            maxWidth: "1600px",
            padding: "0 20px",
            boxSizing: "border-box",
          }}
        >
          {services?.data?.map((service, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 6px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                maxWidth: "400px",
                textAlign: "center",
                transition: "transform 0.3s ease",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "10px",
                }}
              ></div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#333",
                  margin: "15px 0 10px",
                }}
              >
                {service.title}
              </h3>
              <div
                style={{
                  fontSize: "16px",
                  color: "#666",
                  margin: 0,
                  textAlign: "justify",
                }}
                dangerouslySetInnerHTML={{
                  __html: service.content?.slice(0, 150) + '...', // Truncated content
                }}
              />
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#0056a8",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onClick={() => handleReadMore(service.id)} // Navigate to service detail page
              >
                Đọc tiếp
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicePage;
