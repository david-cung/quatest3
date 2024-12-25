import "./IntroPage.css";
import images from '../utils/imageImports';

const { intro } = images;
const IntroPage = () => {
  return (
    <div className="intro-page">
      <h1>Giới Thiệu Chung</h1>
      <div className="content">
        <p>
          Trung tâm Kỹ thuật Tiêu Chuẩn Đo lường Chất lượng 3 (QUATEST 3), gọi
          tắt là Trung tâm 3, là tổ chức Khoa học và Công nghệ công lập trực
          thuộc Ủy ban Tiêu chuẩn Đo lường Chất lượng Quốc gia (STAMEQ) - Bộ Khoa
          học và Công nghệ (MOST).
        </p>
        <div className="buttons">
          <button className="brochure">Brochure GIỚI THIỆU CHUNG QUATEST 3</button>
          <button className="profile">Thông tin HỒ SƠ NĂNG LỰC QUATEST 3</button>
          <button className="leaflet">Các Leaflet GIỚI THIỆU DỊCH VỤ QUATEST 3</button>
        </div>
        <div className="image-video">
          <img
            src={intro}
            alt="QUATEST 3"
            className="intro-image"
          />
          <iframe
            src="https://www.youtube.com/embed/your-video-id"
            title="Giới thiệu QUATEST 3"
            className="intro-video"
          ></iframe>
        </div>
        <p>
          QUATEST 3 luôn nỗ lực để giữ vững là tổ chức hàng đầu tại Việt Nam cung
          cấp dịch vụ kỹ thuật liên quan tiêu chuẩn, đo lường, chất lượng phục vụ
          yêu cầu quản lý Nhà nước cũng như đáp ứng các yêu cầu phát triển của tổ
          chức, doanh nghiệp.
        </p>
      </div>
    </div>
  );
};

export default IntroPage;