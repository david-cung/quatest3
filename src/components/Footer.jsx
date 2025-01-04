
function Footer() {
  return (
    <footer style={{ backgroundColor: "#fefefe", padding: "40px 20px", borderTop: "3px solid #f04e31" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Phần thông tin tổng quan */}
        <div style={{ flex: "1 1 60%", paddingRight: "20px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "28px", color: "#333", fontWeight: "bold", marginBottom: "15px" }}>
            CÔNG TY CỔ PHẦN KIỂM ĐỊNH HIỆU CHUẨN ĐO LƯỜNG MIỀN TRUNG TÂY NGUYÊN
          </h2>
          <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.8" }}>
            Intest là đơn vị chuyên các giải pháp toàn diện từ hiệu chuẩn, kiểm định thiết bị đến bảo trì – sửa chữa,
            đào tạo và huấn luyện. Nhờ áp dụng những công nghệ đứng đầu xu hướng, thiết bị hiệu chuẩn hiện đại, Intest
            luôn không ngừng nâng cao chất lượng dịch vụ và là địa chỉ hiệu chuẩn uy tín giúp khách hàng có thêm sự
            lựa chọn.
          </p>
        </div>

        {/* Phần liên hệ */}
        <div style={{ flex: "1 1 35%", paddingLeft: "20px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", color: "#333", fontWeight: "bold", marginBottom: "15px" }}>Liên hệ</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ fontSize: "18px", color: "#555", marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <i
                className="fas fa-map-marker-alt"
                style={{ marginRight: "10px", color: "#f04e31", fontSize: "20px" }}
              ></i>
              <span>161 Ngô Sĩ Liên, P. Trần Phú, Tp. Quảng Ngãi</span>
            </li>
            <li style={{ fontSize: "18px", color: "#555", marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <i
                className="fas fa-phone-alt"
                style={{ marginRight: "10px", color: "#4caf50", fontSize: "20px" }}
              ></i>
              <span>035 8330 160</span>
            </li>
            <li style={{ fontSize: "18px", color: "#555", marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <i
                className="fas fa-comments"
                style={{ marginRight: "10px", color: "#0078d7", fontSize: "20px" }}
              ></i>
              <span>Zalo: 035 8330 160</span>
            </li>
            <li style={{ fontSize: "18px", color: "#555", marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <i
                className="fas fa-envelope"
                style={{ marginRight: "10px", color: "#fca311", fontSize: "20px" }}
              ></i>
              <span>info@mitest.vn</span>
            </li>
          </ul>

          {/* Phần icon mạng xã hội */}
          <div style={{ marginTop: "15px" }}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginRight: "10px",
                textDecoration: "none",
                display: "inline-block",
                width: "40px",
                height: "40px",
                backgroundColor: "#3b5998",
                borderRadius: "50%",
                color: "#fff",
                textAlign: "center",
                lineHeight: "40px",
                fontSize: "20px",
              }}
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginRight: "10px",
                textDecoration: "none",
                display: "inline-block",
                width: "40px",
                height: "40px",
                backgroundColor: "#c13584",
                borderRadius: "50%",
                color: "#fff",
                textAlign: "center",
                lineHeight: "40px",
                fontSize: "20px",
              }}
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginRight: "10px",
                textDecoration: "none",
                display: "inline-block",
                width: "40px",
                height: "40px",
                backgroundColor: "#0077b5",
                borderRadius: "50%",
                color: "#fff",
                textAlign: "center",
                lineHeight: "40px",
                fontSize: "20px",
              }}
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
