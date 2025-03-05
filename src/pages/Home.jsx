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
          height: '500px',
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

function HomePage() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div style={{ backgroundColor: "#fafafa", paddingTop: "120px" }}>
      <AutoSweetImages />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "1200px",
          margin: "40px auto",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ flex: "2", minWidth: "300px" }}>
          <h2
            className='font-roboto'
            style={{
              fontSize: "22px",
              color: "#555",
              fontWeight: "bold",
              margin: "0 20px",
            }}
          >
            GIỚI THIỆU VỀ INTEST
          </h2>
          <h1
            className='font-roboto'
            style={{
              fontSize: "28px",
              color: "#222",
              fontWeight: "bold",
              margin: "10px 20px",
            }}
          >
            INTEST là đơn vị cung cấp dịch vụ hiệu chuẩn thiết bị, máy móc đạt
            chất lượng cao với mong muốn đem lại cho khách hàng những dịch vụ
            chất lượng, nhanh chóng và hiệu quả.
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#555",
              lineHeight: "1.8",
              margin: "10px 20px 20px",
            }}
          >
            INTEST chuyên cung cấp dịch vụ hiệu chuẩn máy móc và các thiết bị đo
            lường trong các lĩnh vực:
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: "0 20px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              fontSize: "16px",
              color: "#333",
            }}
          >
            <li>- Khối lượng</li>
            <li>- Lực - độ cứng</li>
            <li>- Áp suất</li>
            <li>- Nhiệt</li>
            <li>- Điện - Điện tử</li>
            <li>- Độ dài</li>
            <li>- Hoá lý</li>
            <li>- Dung tích - Lưu lượng</li>
            <li>- Quang học - Bức xạ</li>
          </ul>
        </div>

        <div
          style={{ maxWidth: "400px", textAlign: "center", minWidth: "300px" }}
        >
          <img
            src={service10}
            alt='Thiết bị đo lường'
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              width: "100%",
              maxWidth: "300px",
              transition: "transform 0.3s ease-in-out",
              transform: isHovering ? "scale(1.1)" : "scale(1)",
            }}
          />
        </div>
      </div>

      <div className=' ml-40 mr-36 mb-16'>
        <p
          style={{
            fontSize: "18px",
            color: "#555",
            lineHeight: "1.8",
          }}
        >
          INTEST với đội ngũ nhân viên có kinh nghiệm lâu năm trong lĩnh vực
          hiệu chuẩn đo lường, được đào tạo chuyên môn ở Viện Đo Lường Việt Nam
          (VMI), Trung tâm Kỹ thuật Tiêu Chuẩn Đo lường Chất lượng 3 (QUATEST
          3), Trung Tâm Đào Tạo Nghiệp Vụ Tiêu Chuẩn Đo Lường Chất Lượng (QTC)
          cùng với sự đầu tư về máy móc, thiết bị hiện đại.
          <br />
          <br />
          Chúng tôi luôn luôn phát triển để nâng cao kiến thức và chất lượng
          dịch vụ, lắng nghe và tư vấn cho khách hàng giải pháp tối ưu nhất mang
          lại hiệu quả kinh tế cao. Luôn đảm bảo tuân thủ theo các yêu cầu về
          quản lý và năng lực kỹ thuật cùng với hệ thống quản lý chất lượng để
          đưa ra kết quả đo lường có độ tin cậy cao được Quốc Tế thừa nhận.
          <br />
          <br />
          Cảm ơn Quý Khách hàng đã luôn tin tưởng và ủng hộ chúng tôi!
        </p>
      </div>

      <Services />

      <NewSection />
    </div>
  );
}

export default HomePage;