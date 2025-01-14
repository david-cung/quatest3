import images from "../utils/imageImports";

const { intro1 } = images;

const IntroPage = () => {
  const styles = {
    body: {
      backgroundColor: "#ffffff", // Nền trắng cho toàn bộ trang
      minHeight: "100vh", // Chiều cao tối thiểu để bao phủ toàn bộ màn hình
      margin: 0,
      padding: 0,
    },
    page: {
      textAlign: "center",
      margin: "0 auto",
      padding: "20px",
      paddingTop: "120px",
      maxWidth: "1200px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Hiệu ứng bóng cho nội dung
      borderRadius: "10px", // Bo góc cho nội dung
      color: "#000000", // Chữ màu đen
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "20px",
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start", // Căn hình ảnh và văn bản cùng dòng đầu tiên
      gap: "20px",
    },
    text: {
      flex: 1,
      textAlign: "left",
    },
    list: {
      listStyleType: "disc",
      marginLeft: "20px",
    },
    imageContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
    },
    image: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "10px",
    },
    // Responsive design
    responsive: {
      flexDirection: "column",
      textAlign: "center",
    },
  };

  const isMobile = window.innerWidth < 768; // Kiểm tra nếu màn hình nhỏ hơn 768px

  // Áp dụng style cho body thông qua JavaScript
  document.body.style = `background-color: ${styles.body.backgroundColor}; margin: ${styles.body.margin}; padding: ${styles.body.padding};`;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Giới Thiệu Chung</h1>
      <div
        style={{
          ...styles.container,
          ...(isMobile && styles.responsive), // Áp dụng responsive nếu màn hình nhỏ
        }}
      >
        <div style={styles.text}>
          <p>
            Công ty Cổ phần Kiểm định Hiệu chuẩn Đo lường miền Trung Tây Nguyên –
            Intest tự hào là một trong những đơn vị hoạt động trong lĩnh vực hiệu
            chuẩn thiết bị, kiểm định, đào tạo và huấn luyện, bảo trì và sửa chữa
            các thiết bị đo, các thiết bị máy móc chuyên dụng cho đa dạng lĩnh vực
            khác nhau, cụ thể như:
          </p>
          <ul style={styles.list}>
            <li>Hiệu chuẩn lĩnh vực lực – độ cứng</li>
            <li>Hiệu chuẩn lĩnh vực khối lượng</li>
            <li>Hiệu chuẩn lĩnh vực độ dài</li>
            <li>Hiệu chuẩn lĩnh vực nhiệt</li>
            <li>Hiệu chuẩn lĩnh vực hóa lý</li>
            <li>Hiệu chuẩn lĩnh vực cơ</li>
            <li>Hiệu chuẩn lĩnh vực áp suất – dung tích – lưu lượng</li>
            <li>Hiệu chuẩn lĩnh vực quang học – bức xạ</li>
            <li>Hiệu chuẩn lĩnh vực điện</li>
          </ul>
          <p style={{paddingTop: '90px'}}>
          Với năng lực hiểu rõ bản chất về kiểm định và hiệu chuẩn thiết bị đo lường, Mitest tự tin mang đến quý khách hàng một giải pháp dịch vụ toàn diện, đầy đủ và chính xác nhất cho các vấn đề liên quan đến máy móc thiết bị. Đội ngũ chuyên viên, kỹ thuật viên được đào tạo có chuyên môn, có chứng chỉ sẽ đến tận nơi để khảo sát các máy móc thiết bị trước khi hiệu chuẩn.
          </p>
          <p>
          Đến với Mitest, bạn sẽ được trải nghiệm dịch vụ chất lượng, tiết kiệm tối đa về chi phí với quy trình làm việc chuyên nghiệp và phục vụ tận tâm. Các dịch vụ hiệu chuẩn của chúng tôi đạt chứng chỉ tiêu chuẩn quốc tế ISO/IEC 17025: 2017. Chính vì vậy, nếu bạn đang tìm đối tác hiệu chuẩn chính xác thì Mitest chính là sự lựa chọn rất đáng cân nhắc.
          </p>
        </div>
        <div style={styles.imageContainer}>
          <img
            src={intro1}
            alt="QUATEST 3"
            style={{ ...styles.image, alignSelf: "flex-start" }} // Đảm bảo hình ảnh nằm cùng hàng với văn bản
          />
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
