import { useEffect, useState } from "react";
import axios from "axios";

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/v1/posts");
        setServices(response.data); // Assuming the API returns a list of services
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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
          QUATEST 3 thực hiện các hoạt động cung cấp dịch vụ kỹ thuật theo các
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
            gap: "30px", // Tăng khoảng cách giữa các item
            justifyContent: "center",
            maxWidth: "1600px", // Tăng chiều rộng tối đa
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
                borderRadius: "10px", // Để bo góc
                boxShadow: "0 6px 8px rgba(0, 0, 0, 0.1)", // Tăng độ mờ của bóng
                padding: "20px", // Tăng padding
                maxWidth: "400px", // Tăng chiều rộng tối đa của từng item
                textAlign: "center",
                transition: "transform 0.3s ease", // Hiệu ứng khi hover
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px", // Tăng chiều cao của ảnh
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "10px", // Tăng độ bo góc của ảnh
                }}
              ></div>
              <h3
                style={{
                  fontSize: "24px", // Tăng kích thước chữ tiêu đề
                  fontWeight: "bold",
                  color: "#333",
                  margin: "15px 0 10px", // Tăng khoảng cách
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: "16px", // Tăng kích thước chữ mô tả
                  color: "#666",
                  margin: 0,
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicePage;
