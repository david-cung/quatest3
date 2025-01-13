import { useState, useEffect } from "react";
import images from "../utils/imageImports";
import NewSection from "../components/NewSection";

const { service10, introduce1, introduce2, introduce3, introduce4 } = images;

const AutoSweetImages = () => {
  const images = [introduce1, introduce2, introduce3, introduce4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="auto-sweet-images">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        style={{
          maxWidth: "100%",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

function HomePage() {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (questionIndex) => {
    setExpandedQuestion(
      expandedQuestion === questionIndex ? null : questionIndex
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "40px 20px",
        paddingTop: "120px",
      }}
    >
      <AutoSweetImages />

      <div
        style={{
          display: "flex",
          maxWidth: "1200px",
          margin: "40px auto",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ flex: "2" }}>
          <h2 style={{ fontSize: "22px", color: "#555", fontWeight: "bold" }}>
            GIỚI THIỆU VỀ INTEST
          </h2>
          <h1
            style={{
              fontSize: "28px",
              color: "#222",
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            DỊCH VỤ KIỂM ĐỊNH HIỆU CHUẨN ĐO LƯỜNG TRÊN TOÀN QUỐC
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#555",
              lineHeight: "1.8",
              margin: "10px 0 20px",
            }}
          >
            Intest là một trong những công ty hiệu chuẩn thiết bị đo lường uy tín
            tại khu vực miền Trung Tây Nguyên. Đến với Intest, bạn sẽ được trải
            nghiệm dịch vụ chất lượng, tận nơi, tận nhà máy. Bằng dịch vụ chuyên
            nghiệp nhất, chúng tôi tin tưởng sẽ đáp ứng được mọi yêu cầu của
            khách hàng.
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              fontSize: "16px",
              color: "#333",
            }}
          >
            <li>✔️ Đo lường lực</li>
            <li>✔️ Đo lường khối lượng</li>
            <li>✔️ Đo lường độ dài</li>
            <li>✔️ Đo lường nhiệt</li>
            <li>✔️ Đo lường áp suất</li>
            <li>✔️ Đo lường dung tích</li>
            <li>✔️ Đo lường hóa lý</li>
            <li>✔️ Đo lường điện</li>
            <li>✔️ Đo lường lưu lượng</li>
            <li>✔️ Đo lường quang học</li>
          </ul>
        </div>

        <div style={{ flex: "1", textAlign: "center" }}>
          <img
            src={service10}
            alt="Thiết bị đo lường"
            style={{
              maxWidth: "100%",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <div style={{ flex: "2" }}>
          <h2 style={{ fontSize: "24px", color: "#333", fontWeight: "bold" }}>
            Câu hỏi thường gặp!
          </h2>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
              {[
                {
                  question: "Hiệu chuẩn là gì? Kiểm định là gì?",
                  answer:
                    "Hiệu chuẩn là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, chuẩn phương tiện đo với giá trị đo của thiết bị - phương tiện cần đo. Kiểm định là hoạt động đánh giá, xác nhận đặc tính kỹ thuật đo lường của phương tiện đo theo yêu cầu kỹ thuật đo lường.",
                },
                {
                  question: "Làm sao để xác định các điểm hiệu chuẩn?",
                  answer:
                    "Trước tiên, bạn cần đọc kỹ những khuyến cáo của nhà sản xuất. Sau đó, tùy theo tình hình, bạn cần phải xác định điểm hiệu chuẩn phụ thuộc vào chức năng, dải đo và mức độ đo mà thiết bị sẽ được sử dụng trong suốt thời gian hiệu chuẩn.",
                },
                {
                  question: "Làm thế nào để quyết định thời gian hiệu chuẩn cho thiết bị?",
                  answer:
                    "Trước tiên vẫn là làm theo hướng dẫn của nhà sản xuất. Nếu như bạn có dữ liệu về việc hiệu chỉnh thiết bị của các năm trước đó, hãy phân tích những dữ liệu đó và điều chỉnh sao cho tần suất hiệu chuẩn thiết bị lần tới trong khoảng thời gian như những lần trước. Tần suất hiệu chuẩn cho các thiết bị đo điện phổ biết nhất là 1 năm một lần.",
                },
                {
                  question:
                    "Intest tư vấn, đánh giá những dây chuyền công nghệ, thiết bị sản xuất nào?",
                  answer:
                    "Intest có đội ngũ với nhiều kinh nghiệm trong việc tư vấn, đánh giá các dây chuyền công nghệ, thiết bị sản xuất dược phẩm, thực phẩm chức năng, mỹ phẩm, thực phẩm.",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  onClick={() => toggleQuestion(index)}
                  style={{
                    padding: "15px 20px",
                    borderBottom: "1px solid #ddd",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    color: "#222",
                    fontSize: "18px",
                  }}
                >
                  ➤ {item.question}
                  {expandedQuestion === index && (
                    <p
                      style={{
                        marginTop: "10px",
                        fontSize: "16px",
                        color: "#555",
                        lineHeight: "1.8",
                      }}
                    >
                      {item.answer}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <NewSection />
    </div>
  );
}

export default HomePage;
