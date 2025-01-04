import React, { useState } from "react";
import "./Header.css";
import MainLogo from "../assets/logo/MainLogo.jpg";

const Header = () => {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={MainLogo} alt="Logo" />
          <span>QUATEST 3<sup>®</sup></span>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="home">TRANG CHỦ</a></li>
            <li
              className="dropdown"
              onMouseEnter={() => setShowAboutDropdown(true)}
              onMouseLeave={() => setShowAboutDropdown(false)}
            >
              <a href="about">GIỚI THIỆU</a>
              {showAboutDropdown && (
                <ul className="dropdown-menu">
                  <li><a href="about-overview">Giới thiệu chung</a></li>
                  <li><a href="about-activities">Các hoạt động</a></li>
                  <li><a href="about-capabilities">Năng lực</a></li>
                  <li><a href="about-policy">Chính sách chất lượng</a></li>
                </ul>
              )}
            </li>
            <li
              className="dropdown"
              onMouseEnter={() => setShowServicesDropdown(true)}
              onMouseLeave={() => setShowServicesDropdown(false)}
            >
              <a href="services">DỊCH VỤ</a>
              {showServicesDropdown && (
                <ul className="dropdown-menu">
                  <li><a href="services-types">Loại dịch vụ</a></li>
                  <li><a href="services-products">Lĩnh vực sản phẩm</a></li>
                </ul>
              )}
            </li>
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
