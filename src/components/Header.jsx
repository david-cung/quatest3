import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLogo from "../assets/logo/MainLogo.jpg";

const Header = () => {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  const navigate = useNavigate(); // React Router's navigation hook

  // Extracted styles for reuse
  const linkStyle = {
    color: "black",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "white",
    listStyle: "none",
    padding: "10px",
    paddingTop: "15px",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    minWidth: "200px",
    borderLeft: "4px solid red", // Red left border for the dropdown
  };

  const dropdownItemStyle = {
    margin: 0,
    padding: "5px 10px",
    color: "black",
    textDecoration: "none",
    fontSize: "14px",
    display: "block",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #ddd", // Footer border for each element
  };

  return (
    <header
      style={{
        backgroundColor: "white",
        padding: "10px 20px",
        borderBottom: "1px solid #ddd",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        height: "100px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/")} // Navigate to the home page
        >
          <img
            src={MainLogo}
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <span>
            INTEST<sup>®</sup>
          </span>
        </div>

        {/* Navigation */}
        <nav>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              margin: 0,
              padding: 0,
            }}
          >
            <li style={{ position: "relative", margin: "0 15px" }}>
              <a href="home" style={linkStyle}>
                TRANG CHỦ
              </a>
            </li>
            <li
              style={{ position: "relative", margin: "0 15px" }}
              onMouseEnter={() => setShowAboutDropdown(true)}
              onMouseLeave={() => setShowAboutDropdown(false)}
            >
              <a href="about" style={linkStyle}>
                GIỚI THIỆU
              </a>
              {showAboutDropdown && (
                <ul style={dropdownStyle}>
                  <li>
                    <a href="about-overview" style={dropdownItemStyle}>
                      Giới thiệu chung
                    </a>
                  </li>
                  <li>
                    <a href="about-activities" style={dropdownItemStyle}>
                      Các hoạt động
                    </a>
                  </li>
                  <li>
                    <a href="about-capabilities" style={dropdownItemStyle}>
                      Năng lực
                    </a>
                  </li>
                  <li>
                    <a href="about-policy" style={dropdownItemStyle}>
                      Chính sách chất lượng
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li
              style={{ position: "relative", margin: "0 15px" }}
              onMouseEnter={() => setShowServicesDropdown(true)}
              onMouseLeave={() => setShowServicesDropdown(false)}
            >
              <a href="services" style={linkStyle}>
                DỊCH VỤ
              </a>
              {showServicesDropdown && (
                <ul style={dropdownStyle}>
                  <li>
                    <a href="services-types" style={dropdownItemStyle}>
                      Hiệu chuẩn, kiểm định
                    </a>
                  </li>
                  <li>
                    <a href="services-products" style={dropdownItemStyle}>
                      Hiệu chuẩn tận nơi
                    </a>
                  </li>
                  <li>
                    <a href="services-training" style={dropdownItemStyle}>
                      Đào tạo và huấn luyện
                    </a>
                  </li>
                  <li>
                    <a href="services-maintenance" style={dropdownItemStyle}>
                      Bảo trì-sửa chữa
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li style={{ position: "relative", margin: "0 15px" }}>
              <a href="#news" style={linkStyle}>
                TIN TỨC
              </a>
            </li>
            <li style={{ position: "relative", margin: "0 15px" }}>
              <a href="#faq" style={linkStyle}>
                HỎI ĐÁP
              </a>
            </li>
            <li style={{ position: "relative", margin: "0 15px" }}>
              <a href="contact" style={linkStyle}>
                LIÊN HỆ
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
