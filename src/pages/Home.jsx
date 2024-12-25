import React from 'react';
import './HomePage.css';
import service1 from '../assets/services/service1.png';
import service2 from '../assets/services/service2.png';
import service3 from '../assets/services/service3.jpg';
import service4 from '../assets/services/service4.jpg';
import service5 from '../assets/services/service5.jpg';
import service6 from '../assets/services/service6.png';

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
  const images = [
    '/9dich vu.png',
    '/BannerGNTN_u.png',
    '/cac-nhom-san-pham.jpg',
    '/cscl.png',
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
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