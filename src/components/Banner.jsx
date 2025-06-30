
const Banner = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        margin: "0",
        padding: "20px",
        backgroundColor: "#f77e7e", // Light red background for the banner
        color: "#000",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        lineHeight: "1.5",
        display: "flex",
        alignItems: "center", // Center content vertically
        justifyContent: "center", // Center content horizontally
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      {/* Centered text content */}
      <div
        style={{
          maxWidth: "800px", // Limit the width of the text block
          lineHeight: "1.6", // Slightly increase line height for readability
        }}
      >
        Luôn lắng nghe và nỗ lực hết mình trong việc mang đến một giải pháp tổng thể: 
        Hiệu chuẩn - Kiểm định - Bảo trì - Sửa chữa - Đào tạo & huấn luyện phù hợp 
        từng yêu cầu khách hàng.
      </div>

      {/* Phone number on the right */}
      <div
        style={{
          position: "absolute", // Position the phone number relative to the parent
          right: "20px", // Keep it close to the right edge
          top: "50%", // Vertically align with the center of the parent
          transform: "translateY(-50%)", // Adjust for perfect vertical centering
          backgroundColor: "#0056b3", // Blue background for the phone section
          color: "#fff", // White text
          padding: "10px 20px",
          borderRadius: "20px", // Rounded corners
          fontWeight: "bold",
          fontSize: "18px",
          display: "inline-block",
        }}
      >
        📞 0987 852 752
      </div>
    </div>
  );
};

export default Banner;
