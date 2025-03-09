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
        const response = await axios.get(`/api/v1/services`);
        setNewsData(response.data.data.slice(0, 5)); // Hiển thị tối đa 5 item
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Không thể tải dữ liệu, vui lòng thử lại sau.");
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleNavigate = (serviceId) => {
    navigate(`/service/${serviceId}`);
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
        {newsData.map((service, index) => (
          <div
            key={index}
            className='bg-white bg-opacity-95 rounded overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer w-full max-w-xs'
            onClick={() => handleNavigate(service._id || service.id)}
          >
            <div className='h-40 overflow-hidden'>
              <img
                src={service.image}
                alt={service.title}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='p-4'>
              <h3 className='text-[#051d33] text-lg font-bold mb-2'>
                {service.title}
              </h3>
              <p className='text-gray-700 text-sm leading-relaxed'>
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}