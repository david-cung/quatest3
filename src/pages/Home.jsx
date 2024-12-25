import React, { useState, useEffect } from 'react';
import './HomePage.css';
import images from '../utils/imageImports';

const { service1, service2, service3, service4, service5, service6, introduce1, introduce2, introduce3, introduce4 } = images;

const services = [
  {
    title: 'THỬ NGHIỆM CHẤT LƯỢNG VÀ AN TOÀN CỦA SẢN PHẨM, HÀNG HÓA',
    description: 'Đảm bảo chất lượng và an toàn tối ưu cho sản phẩm.',
    image: service1,
  },
  {
    title: 'KIỂM TRA NHÀ NƯỚC, GIÁM ĐỊNH, KIỂM ĐỊNH AN TOÀN',
    description: 'Dịch vụ kiểm tra và giám định đạt chuẩn.',
    image: service2,
  },
  {
    title: 'CHỨNG NHẬN CHẤT LƯỢNG CỦA SẢN PHẨM, HÀNG HÓA',
    description: 'Đảm bảo sản phẩm đạt chứng nhận quốc tế.',
    image: service3,
  },
  {
    title: 'CHỨNG NHẬN HỆ THỐNG QUẢN LÝ',
    description: 'Tối ưu hóa hệ thống quản lý doanh nghiệp.',
    image: service4,
  },
  {
    title: 'HIỆU CHUẨN, KIỂM ĐỊNH PHƯƠNG TIỆN ĐO',
    description: 'Đo lường chính xác và đáng tin cậy.',
    image: service5,
  },
  {
    title: 'THỬ NGHIỆM THÀNH THẠO VÀ SO SÁNH LIÊN PHÒNG',
    description: 'Đánh giá năng lực phòng thí nghiệm.',
    image: service6,
  },
];

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
        className="auto-sweet-image"
      />
    </div>
  );
};

const ServiceCard = ({ title, description, image }) => (
  <div className="service-card">
    <div className="service-image" style={{ backgroundImage: `url(${image})` }}>
      <div className="service-description">{description}</div>
    </div>
    <h3>{title}</h3>
  </div>
);

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Auto Sweet Section */}
      <AutoSweetImages />

      {/* Services Section */}
      <div className="services-section">
        <h2>Dịch Vụ Chúng Tôi Cung Cấp</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
