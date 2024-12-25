import React from "react";
import "./Footer.css"; // File CSS để styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <p className="footer-text">Trung tâm Kỹ thuật Tiêu chuẩn Đo lường Chất lượng 3</p>
          <p className="footer-text">
            49 Pasteur, Phường Nguyễn Thái Bình, Quận 1, TP. Hồ Chí Minh
          </p>
          <p className="footer-text">028 382 942 74 | 028 382 930 12</p>
          <p className="footer-text">
            Website: <a href="http://www.quatest3.com.vn" target="_blank" rel="noopener noreferrer">www.quatest3.com.vn</a>
          </p>
          <p className="footer-text">
            Email: <a href="mailto:info@quatest3.com.vn">info@quatest3.com.vn</a>
          </p>
        </div>
        <div className="footer-socials">
          <a href="https://www.facebook.com/QUATEST3" target="_blank" rel="noopener noreferrer" className="social-link">
            QUATEST 3 Fanpage
          </a>
          <a href="https://zalo.me/QUATEST3" target="_blank" rel="noopener noreferrer" className="social-link">
            QUATEST 3 Zalo OA
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
