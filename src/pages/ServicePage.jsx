import React from "react";
import "./ServicePage.css";

const serviceByType = [
  {
    image: "/path-to-image1.jpg",
    title: "Thử nghiệm chất lượng và an toàn của sản phẩm, hàng hóa",
    description:
      "QUATEST 3 cung cấp dịch vụ thử nghiệm, phân tích chất lượng và tính an toàn đối với các loại sản phẩm.",
  },
  {
    image: "/path-to-image2.jpg",
    title: "Kiểm tra nhà nước, giám định, kiểm định an toàn",
    description:
      "Dịch vụ kiểm tra nhà nước, giám định, kiểm định an toàn thuộc trách nhiệm của QUATEST 3.",
  },
];

const serviceByField = [
  {
    image: "/path-to-image3.jpg",
    title: "Nông sản - Thực phẩm",
    description:
      "An toàn thực phẩm là một khái niệm khoa học chỉ sự không chứa vi sinh vật gây bệnh.",
  },
  {
    image: "/path-to-image4.jpg",
    title: "Hàng tiêu dùng - Dầu khí - Hóa chất - Môi trường",
    description:
      "Hỗ trợ các doanh nghiệp trong việc phân tích các sản phẩm tiêu dùng.",
  },
];

const ServicePage = () => {
  return (
    <div className="service-page">
      <div className="service-header">
        <h1>Dịch vụ</h1>
        <p>
          QUATEST 3 thực hiện các hoạt động cung cấp dịch vụ kỹ thuật theo các
          lĩnh vực tiêu chuẩn đo lường chất lượng.
        </p>
      </div>

      <div className="service-sections">
        <div className="service-section">
          <h2>DỊCH VỤ THEO LOẠI DỊCH VỤ</h2>
          <div className="service-cards">
            {serviceByType.map((item, idx) => (
              <div className="service-card" key={idx}>
                <div
                  className="service-image"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="service-section">
          <h2>DỊCH VỤ THEO LĨNH VỰC SẢN PHẨM</h2>
          <div className="service-cards">
            {serviceByField.map((item, idx) => (
              <div className="service-card" key={idx}>
                <div
                  className="service-image"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
