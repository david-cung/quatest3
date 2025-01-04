function FixedContact() {
  return (
    <div>
      {/* Số điện thoại và icon bên trái */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Phone 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#4caf50",
            borderRadius: "30px",
            padding: "10px 15px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <i
            className="fas fa-phone-alt"
            style={{ color: "white", fontSize: "20px", marginRight: "10px" }}
          ></i>
          <span style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}>
            098 7852 752
          </span>
        </div>
        {/* Phone 2 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#4caf50",
            borderRadius: "30px",
            padding: "10px 15px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <i
            className="fas fa-phone-alt"
            style={{ color: "white", fontSize: "20px", marginRight: "10px" }}
          ></i>
          <span style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}>
            035 4934 953
          </span>
        </div>
      </div>

      {/* Icon Zalo và Messenger bên phải */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Icon Zalo */}
        <a
          href="https://zalo.me/0358330160"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#0078d7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <img
            src="icon-zalo.png"
            alt="Zalo"
            style={{ width: "30px", height: "30px" }}
          />
        </a>

        {/* Icon Messenger */}
        <a
          href="https://m.me/yourpageid"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#0084ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <i className="fab fa-facebook-messenger" style={{ color: "white", fontSize: "30px" }}></i>
        </a>
      </div>
    </div>
  );
}

export default FixedContact;
