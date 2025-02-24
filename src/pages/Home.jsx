import { useState, useEffect } from "react";
import images from "../utils/imageImports";
import NewSection from "../components/NewSection";
import Services from "../components/Services";
import "./Home.css";

const { service10, introduce1, introduce3, introduce4 } = images;

const AutoSweetImages = () => {
  const images = [introduce1, introduce3, introduce4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
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
  const [isHovering, setIsHovering] = useState(false);

  const toggleQuestion = (questionIndex) => {
    setExpandedQuestion(expandedQuestion === questionIndex ? null : questionIndex);
  };

  return (
    <div style={{ backgroundColor: "#fafafa", paddingTop: "120px", padding: "10px" }}>
      <AutoSweetImages />
      
      <div style={{
        display: "flex", flexWrap: "wrap", maxWidth: "1200px", margin: "40px auto", gap: "20px", alignItems: "center"
      }}>
        <div style={{ flex: "2", minWidth: "300px" }}>
          <h2 style={{ fontSize: "22px", color: "#555", fontWeight: "bold" }}>GIỚI THIỆU VỀ INTEST</h2>
          <h1 style={{ fontSize: "28px", color: "#222", fontWeight: "bold", margin: "10px 0" }}>
            INTEST là đơn vị cung cấp dịch vụ hiệu chuẩn thiết bị, máy móc đạt
            chất lượng cao với mong muốn đem lại cho khách hàng những dịch vụ chất lượng, nhanh chóng và hiệu quả.
          </h1>
          <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.8", margin: "10px 0 20px" }}>
          INTEST chuyên cung cấp dịch vụ hiệu chuẩn máy móc và các thiết bị đo lường trong các lĩnh vực:
          </p>
          <ul style={{
            listStyle: "none", padding: "0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px",
            fontSize: "16px", color: "#333"
          }}>
            <li>- Khối lượng - Lực - Áp suất - Dung Tích</li>
            <li>- Kích thước</li>
            <li>- Nhiệt độ - Độ ẩm</li>
            <li>- Hóa -Lý</li>
            <li>- Điện - Điện tử</li>
            <li>- Đo lường dung tích</li>
            <li>- Thời gian - Tần số</li>
          </ul>
        </div>

        <div style={{ maxWidth: "400px", textAlign: "center", minWidth: "300px" }}>
          <img
            src={service10}
            alt="Thiết bị đo lường"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              width: "100%",
              maxWidth: "300px",
              transition: "transform 0.3s ease-in-out",
              transform: isHovering ? "scale(1.1)" : "scale(1)"
            }}
          />
        </div>
      </div>

      <div style={{ margin: "20px", textAlign: "justify" }}>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.8", margin: "20px 0" }}>
          INTEST với đội ngũ nhân viên có kinh nghiệm lâu năm trong lĩnh vực hiệu chuẩn đo lường, 
          được đào tạo chuyên môn ở Viện Đo Lường Việt Nam (VMI), Trung tâm Kỹ thuật Tiêu Chuẩn Đo lường 
          Chất lượng 3 (QUATEST 3), Trung Tâm Đào Tạo Nghiệp Vụ Tiêu Chuẩn Đo Lường Chất Lượng (QTC) 
          cùng với sự đầu tư về máy móc, thiết bị hiện đại.
          <br /><br />
          Chúng tôi luôn luôn phát triển để nâng cao kiến thức và chất lượng dịch vụ, lắng nghe và tư vấn 
          cho khách hàng giải pháp tối ưu nhất mang lại hiệu quả kinh tế cao. Luôn đảm bảo tuân thủ theo 
          các yêu cầu về quản lý và năng lực kỹ thuật cùng với hệ thống quản lý chất lượng để đưa ra kết 
          quả đo lường có độ tin cậy cao được Quốc Tế thừa nhận.
          <br /><br />
          Cảm ơn Quý Khách hàng đã luôn tin tưởng và ủng hộ chúng tôi!
        </p>
      </div>

      <Services />
      
      <div style={{ textAlign: "center", marginTop: "40px", padding: "20px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
            <span>TIN TỨC</span>
          </h2>
          <div style={{ width: "50px", height: "3px", backgroundColor: "#000", margin: "auto" }}></div>
        </div>
        <NewSection />
      </div>
    </div>
  );
}

export default HomePage;
