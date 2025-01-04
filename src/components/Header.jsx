import { useState } from "react";
import MainLogo from "../assets/logo/MainLogo.jpg";

const Header = () => {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

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
        height: "70px",
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
        <div style={{ display: "flex", alignItems: "center" }}>
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
              <a
                href="home"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                TRANG CHỦ
              </a>
            </li>
            <li
              style={{ position: "relative", margin: "0 15px" }}
              onMouseEnter={() => setShowAboutDropdown(true)}
              onMouseLeave={() => setShowAboutDropdown(false)}
            >
              <a
                href="about"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                GIỚI THIỆU
              </a>
              {showAboutDropdown && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    backgroundColor: "#79bdf2",
                    color: "white",
                    listStyle: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 1000,
                    minWidth: "200px",
                  }}
                >
                  <li style={{ margin: 0, padding: "5px 10px" }}>
                    <a
                      href="about-overview"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "14px",
                        display: "block",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Giới thiệu chung
                    </a>
                  </li>
                  <li style={{ margin: 0, padding: "5px 10px" }}>
                    <a
                      href="about-activities"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "14px",
                        display: "block",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Các hoạt động
                    </a>
                  </li>
                  <li style={{ margin: 0, padding: "5px 10px" }}>
                    <a
                      href="about-capabilities"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "14px",
                        display: "block",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Năng lực
                    </a>
                  </li>
                  <li style={{ margin: 0, padding: "5px 10px" }}>
                    <a
                      href="about-policy"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "14px",
                        display: "block",
                        whiteSpace: "nowrap",
                      }}
                    >
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
              <a
                href="services"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                DỊCH VỤ
              </a>
              {showServicesDropdown && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    backgroundColor: "#79bdf2",
                    color: "white",
                    listStyle: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 1000,
                    minWidth: "200px",
                  }}
                >
                  <li style={{ margin: 0, padding: "5px 10px" }}>
                    <a
                      href="services-types"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "14px",
                        display: "block",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Loại dịch vụ
                    </a>
                  </li>
                  <li style={{ margin: 0, padding: "5px 10px" }}>
                    <a
                      href="services-products"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "14px",
                        display: "block",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Lĩnh vực sản phẩm
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li style={{ position: "relative", margin: "0 15px" }}>
              <a
                href="#news"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                TIN TỨC
              </a>
            </li>
            <li style={{ position: "relative", margin: "0 15px" }}>
              <a
                href="#faq"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                HỎI ĐÁP
              </a>
            </li>
            <li style={{ position: "relative", margin: "0 15px" }}>
              <a
                href="contact"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
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
