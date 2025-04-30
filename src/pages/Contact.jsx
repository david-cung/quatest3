import { useState } from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({ name, phone, message });
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "40px 0",
      maxWidth: "1200px",
      margin: "0 auto",
      marginTop: "80px", // Added margin-top to accommodate for header
      gap: "40px",
    }}>
      {/* Left section - Contact Information */}
      <div style={{
        flex: "1",
        padding: "20px",
      }}>
        <h2 style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          paddingBottom: "10px",
          borderBottom: "2px solid #e74c3c",
          display: "inline-block",
        }}>LIÊN HỆ</h2>
        <p style={{
          fontSize: "16px",
          fontWeight: "bold",
          marginBottom: "20px",
          maxWidth: "600px",
        }}>
          CÔNG TY CỔ PHẦN KIỂM ĐỊNH HIỆU CHUẨN ĐO LƯỜNG KHU VỰC 2
        </p>
        <div style={{
          marginBottom: "10px",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
        }}>
          <span style={{
            width: "20px",
            marginRight: "10px",
          }}>📍</span>
          <span>Địa chỉ: 91 An Dương Vương, phường Trần Phú, TP. Quảng Ngãi, tỉnh Quảng Ngãi</span>
        </div>
        <div style={{
          marginBottom: "10px",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
        }}>
          <span style={{
            width: "20px",
            marginRight: "10px",
          }}>📞</span>
          <span>Điện thoại: 098 7852 752</span>
        </div>
        <div style={{
          marginBottom: "10px",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
        }}>
          <span style={{
            width: "20px",
            marginRight: "10px",
          }}>💬</span>
          <span>Zalo: 098 7852 752</span>
        </div>
        <div style={{
          marginBottom: "10px",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
        }}>
          <span style={{
            width: "20px",
            marginRight: "10px",
          }}>✉️</span>
          <span>Email: sale@mitest.vn</span>
        </div>
        <div style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}>
          <button style={{
            backgroundColor: "#f5f5f5",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}>
            <FacebookIcon style={{ color: "#3b5998" }} />
          </button>
          <button style={{
            backgroundColor: "#f5f5f5",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}>
            <YouTubeIcon style={{ color: "#ff0000" }} />
          </button>
        </div>
      </div>

      {/* Right section - Contact Form */}
      <div style={{
        flex: "1",
        backgroundColor: "#e74c3c",
        borderRadius: "8px",
        padding: "40px",
        color: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}>
        <h2 style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}>GỬI TIN NHẮN</h2>
        <div>
          <div style={{
            marginBottom: "20px",
          }}>
            <input
              type="text"
              placeholder="Họ và tên"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "4px",
                border: "none",
                fontSize: "16px",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{
            marginBottom: "20px",
          }}>
            <input
              type="tel"
              placeholder="Số điện thoại"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "4px",
                border: "none",
                fontSize: "16px",
              }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div style={{
            marginBottom: "20px",
          }}>
            <textarea
              placeholder="Bạn có nhắn nhủ gì với chúng tôi?!"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "4px",
                border: "none",
                fontSize: "16px",
                minHeight: "120px",
                resize: "vertical",
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div style={{ textAlign: "center" }}>
            <button 
              onClick={handleSubmit} 
              style={{
                backgroundColor: "white",
                color: "#e74c3c",
                border: "none",
                padding: "12px 24px",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              Gửi tin nhắn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;