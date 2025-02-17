import images from "../utils/imageImports";

const { intro1 } = images;

const IntroPage = () => {
  const styles = {
    body: {
      backgroundColor: "#f9f9f9", // Nền sáng dễ chịu
      minHeight: "100vh",
      margin: 0,
      padding: 0,
      fontFamily: "Arial, sans-serif", // Font chữ dễ đọc
    },
    page: {
      textAlign: "center",
      margin: "0 auto",
      padding: "20px",
      paddingTop: "100px",
      maxWidth: "1200px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)", // Bóng mềm hơn
      borderRadius: "12px",
      backgroundColor: "#ffffff", // Nền trắng cho nội dung
      color: "#333333", // Chữ màu tối hơn
    },
    title: {
      fontSize: "2.8rem",
      marginBottom: "30px",
      color: "#0073e6", // Màu tiêu đề nổi bật
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "20px",
    },
    text: {
      flex: 1,
      textAlign: "left",
      fontSize: "1rem",
      lineHeight: "1.6",
    },
    list: {
      listStyleType: "disc",
      marginLeft: "20px",
      paddingLeft: "10px",
    },
    imageContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    image: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    responsive: {
      flexDirection: "column",
      textAlign: "center",
    },
    paragraph: {
      marginBottom: "20px",
    },
  };

  const isMobile = window.innerWidth < 768;

  document.body.style = `
    background-color: ${styles.body.backgroundColor}; 
    margin: ${styles.body.margin}; 
    padding: ${styles.body.padding}; 
    font-family: ${styles.body.fontFamily};
  `;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Giới Thiệu Chung</h1>
      <div
        style={{
          ...styles.container,
          ...(isMobile && styles.responsive),
        }}
      >
        <div style={styles.text}>
          <p style={styles.paragraph}>
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
          <p style={{ ...styles.paragraph, paddingTop: "20px" }}>
            Với năng lực hiểu rõ bản chất về kiểm định và hiệu chuẩn thiết bị đo
            lường, Intest tự tin mang đến quý khách hàng một giải pháp dịch vụ
            toàn diện, đầy đủ và chính xác nhất cho các vấn đề liên quan đến máy
            móc thiết bị. Đội ngũ chuyên viên, kỹ thuật viên được đào tạo có chuyên
            môn, có chứng chỉ sẽ đến tận nơi để khảo sát các máy móc thiết bị trước
            khi hiệu chuẩn.
          </p>
          <p style={styles.paragraph}>
            Đến với Intest, bạn sẽ được trải nghiệm dịch vụ chất lượng, tiết kiệm
            tối đa về chi phí với quy trình làm việc chuyên nghiệp và phục vụ tận
            tâm. Các dịch vụ hiệu chuẩn của chúng tôi đạt chứng chỉ tiêu chuẩn quốc
            tế ISO/IEC 17025: 2017. Chính vì vậy, nếu bạn đang tìm đối tác hiệu
            chuẩn chính xác thì Intest chính là sự lựa chọn rất đáng cân nhắc.
          </p>
        </div>
        <div style={styles.imageContainer}>
          <img
            src={intro1}
            alt="QUATEST 3"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
