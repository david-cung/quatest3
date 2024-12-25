import React from "react";
import "./Header.css"; // File CSS để styling
import MainLogo from '../assets/logo/MainLogo.png'; // Sử dụng đư��ng d��n tới file ảnh

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
      <div className="logo">
          {/* Sử dụng đường dẫn tương đối từ thư mục components tới assets */}
          <img src={MainLogo} alt="Logo" />
          <span>QUATEST 3<sup>®</sup></span>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="home">TRANG CHỦ</a></li>
            <li><a href="about">GIỚI THIỆU</a></li>
            <li><a href="services">DỊCH VỤ</a></li>
            <li><a href="#news">TIN TỨC</a></li>
            <li><a href="#faq">HỎI ĐÁP</a></li>
            <li><a href="contact">LIÊN HỆ</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <div className="search-icon">🔍</div>
          <div className="language-switch">
            <img src="/en-small.png" alt="VN" />
            <img src="/vi-small.png" alt="EN" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
