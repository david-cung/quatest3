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
    cursor: "pointer",
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
    cursor: "pointer",
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
        height: "120px", // Increased height to accommodate the larger logo
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
            alt='Logo'
            style={{
              height: "80px", // Increased the logo height
              marginRight: "15px", // Added spacing between the logo and text
            }}
          />
         <div>
         <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#032c57",
              display: "block", // Đảm bảo xuống dòng
              textAlign: "center", // Căn giữa nếu cần
              whiteSpace: "pre-line", // Giữ nguyên xuống dòng
            }}
          >
            CÔNG TY CỔ PHẦN HIỆU CHUẨN INTEST
          </span>
          <span
            style={{
              fontSize: "16px",
              color: "#032c57",
              display: "block", // Đảm bảo xuống dòng
              textAlign: "center", // Căn giữa nếu cần
              whiteSpace: "pre-line", // Giữ nguyên xuống dòng
            }}
          >
          91 An Dương Vương, phường Trần Phú, TP. Quảng Ngãi, tỉnh Quảng Ngãi
          </span>
         </div>
        </div>

        {/* Navigation */}
        <nav>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              margin: 0,
              padding: 0,
              color: "#032c57",
            }}
          >
            <li style={{ position: "relative", margin: "0 15px" }}>
              <span
                style={linkStyle}
                onClick={() => navigate("/home")} // Replace href with navigate
              >
                TRANG CHỦ
              </span>
            </li>
            <li
              style={{ position: "relative", margin: "0 15px" }}
              onMouseEnter={() => setShowAboutDropdown(true)}
              onMouseLeave={() => setShowAboutDropdown(false)}
            >
              <span
                style={linkStyle}
                onClick={() => navigate("/about")} // Replace href with navigate
              >
                GIỚI THIỆU
              </span>
            </li>
            <li
              style={{ position: "relative", margin: "0 15px" }}
              onMouseEnter={() => setShowServicesDropdown(true)}
              onMouseLeave={() => setShowServicesDropdown(false)}
            >
              <span
                style={linkStyle}
                onClick={() => navigate("/services")} // Replace href with navigate
              >
                DỊCH VỤ
              </span>
              {showServicesDropdown && (
                <ul style={dropdownStyle}>
                  <li onClick={() => navigate("/services-types")}>
                    <span style={dropdownItemStyle}>Hiệu chuẩn, kiểm định</span>
                  </li>
                  <li onClick={() => navigate("/services-products")}>
                    <span style={dropdownItemStyle}>Hiệu chuẩn tận nơi</span>
                  </li>
                  <li onClick={() => navigate("/services-training")}>
                    <span style={dropdownItemStyle}>Đào tạo và huấn luyện</span>
                  </li>
                  <li onClick={() => navigate("/services-maintenance")}>
                    <span style={dropdownItemStyle}>Bảo trì-sửa chữa</span>
                  </li>
                </ul>
              )}
            </li>
            <li style={{ position: "relative", margin: "0 15px" }}>
              <span
                style={linkStyle}
                onClick={() => navigate("/news")} // Replace href with navigate
              >
                TIN TỨC
              </span>
            </li>
            <li style={{ position: "relative", margin: "0 15px" }}>
              <span
                style={linkStyle}
                onClick={() => navigate("/faq")} // Replace href with navigate
              >
                HỎI ĐÁP
              </span>
            </li>
            <li style={{ position: "relative", margin: "0 15px" }}>
              <span
                style={linkStyle}
                onClick={() => navigate("/contact")} // Replace href with navigate
              >
                LIÊN HỆ
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
