import { useState, useEffect } from "react";
import images from "../utils/imageImports";
import NewSection from "../components/NewSection";
import "./Home.css";

const { service10, introduce1, introduce2, introduce3, introduce4 } = images;

const AutoSweetImages = () => {
  const images = [introduce1, introduce2, introduce3, introduce4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="auto-sweet-images">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        style={{
          maxWidth: "100%",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

function HomePage() {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const toggleQuestion = (questionIndex) => {
    setExpandedQuestion(
      expandedQuestion === questionIndex ? null : questionIndex
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "40px 20px",
        paddingTop: "120px",
      }}
    >
      {/* Phần ảnh tự động chuyển đổi */}
      <AutoSweetImages />

      {/* Container chính */}
      <div
        style={{
          display: "flex",
          maxWidth: "1200px",
          margin: "40px auto",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {/* Phần mô tả bên trái */}
        <div style={{ flex: "2" }}>
          <h2 style={{ fontSize: "22px", color: "#555", fontWeight: "bold" }}>
            GIỚI THIỆU VỀ INTEST
          </h2>
          <h1
            style={{
              fontSize: "28px",
              color: "#222",
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            DỊCH VỤ KIỂM ĐỊNH HIỆU CHUẨN ĐO LƯỜNG TRÊN TOÀN QUỐC
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#555",
              lineHeight: "1.8",
              margin: "10px 0 20px",
            }}
          >
            Intest là một trong những công ty hiệu chuẩn thiết bị đo lường uy
            tín tại khu vực miền Trung Tây Nguyên. Đến với Intest, bạn sẽ được
            trải nghiệm dịch vụ chất lượng, tận nơi, tận nhà máy. Bằng dịch vụ
            chuyên nghiệp nhất, chúng tôi tin tưởng sẽ đáp ứng được mọi yêu cầu
            của khách hàng.
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              fontSize: "16px",
              color: "#333",
            }}
          >
            <li>✔️ Đo lường lực</li>
            <li>✔️ Đo lường khối lượng</li>
            <li>✔️ Đo lường độ dài</li>
            <li>✔️ Đo lường nhiệt</li>
            <li>✔️ Đo lường áp suất</li>
            <li>✔️ Đo lường dung tích</li>
            <li>✔️ Đo lường hóa lý</li>
            <li>✔️ Đo lường điện</li>
            <li>✔️ Đo lường lưu lượng</li>
            <li>✔️ Đo lường quang học</li>
          </ul>
        </div>

        {/* Phần hình ảnh bên phải */}
        <div
          style={{
            flex: "1",
            textAlign: "center",
          }}
        >
          <img
            src={service10}
            alt="Thiết bị đo lường"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              maxWidth: "100%",
              borderRadius: "10px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              transform: isHovering ? "scale(1.05)" : "scale(1)",
              boxShadow: isHovering
                ? "0 8px 16px rgba(0, 0, 0, 0.2)"
                : "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      </div>
      <section className="elementor-section">
        <div className="element">
          <div className="elementor-container ">
            <div className="elementor-column ">
              <div className="elementor-column-icon ">
                <span className="elementor-icon">
                  <i aria-hidden="true" class="far fa-clock"></i>
                </span>
              </div>
              <div className="elementor-column-title ">
                <h3 class="elementor-icon-box-title">
                  <span>NHANH CHÓNG </span>
                </h3>
              </div>
              <div className="elementor-description">
                <p class="elementor-icon-box-description">
                  Đáp ứng kịp thời yêu cầu của khách hàng, thời gian cung cấp
                  kết quả nhanh chóng và thuận tiện.
                </p>
              </div>
            </div>
            <div className="elementor-column ">
              <div className="elementor-column-icon ">
                <span className="elementor-icon">
                  <i aria-hidden="true" class="fas fa-spell-check"></i>
                </span>
              </div>
              <div className="elementor-column-title ">
                <h3 class="elementor-icon-box-title">
                  <span>CHÍNH XÁC </span>
                </h3>
              </div>
              <div className="elementor-description">
                <p class="elementor-icon-box-description">
                  Đảm bảo tính chính xác của kết quả kiểm định, hiệu chuẩn, giúp
                  khách hàng đánh giá và sử dụng thiết bị phù hợp.
                </p>
              </div>
            </div>
            <div className="elementor-column ">
              <div className="elementor-column-icon ">
                <span className="elementor-icon">
                  <i aria-hidden="true" class="fas fa-funnel-dollar"></i>
                </span>
              </div>
              <div className="elementor-column-title ">
                <h3 class="elementor-icon-box-title">
                  <span>HIỆU QUẢ </span>
                </h3>
              </div>
              <div className="elementor-description">
                <p class="elementor-icon-box-description">
                  Sử dụng thiết bị tân tiến, đạt chuẩn, đánh giá chính xác hoạt
                  động của từng máy móc thiết bị hiện nay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="element section-inform-question">
        <div className="element-question">
          <div className="question">
            <h2 style={{ fontSize: "24px", color: "#333", fontWeight: "bold" }}>
              Câu hỏi thường gặp!
            </h2>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                {[
                  {
                    question: "Hiệu chuẩn là gì? Kiểm định là gì?",
                    answer:
                      "Hiệu chuẩn là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, chuẩn phương tiện đo với giá trị đo của thiết bị - phương tiện cần đo. Kiểm định là hoạt động đánh giá, xác nhận đặc tính kỹ thuật đo lường của phương tiện đo theo yêu cầu kỹ thuật đo lường.",
                  },
                  {
                    question: "Làm sao để xác định các điểm hiệu chuẩn?",
                    answer:
                      "Trước tiên, bạn cần đọc kỹ những khuyến cáo của nhà sản xuất. Sau đó, tùy theo tình hình, bạn cần phải xác định điểm hiệu chuẩn phụ thuộc vào chức năng, dải đo và mức độ đo mà thiết bị sẽ được sử dụng trong suốt thời gian hiệu chuẩn.",
                  },
                  {
                    question:
                      "Làm thế nào để quyết định thời gian hiệu chuẩn cho thiết bị?",
                    answer:
                      "Trước tiên vẫn là làm theo hướng dẫn của nhà sản xuất. Nếu như bạn có dữ liệu về việc hiệu chỉnh thiết bị của các năm trước đó, hãy phân tích những dữ liệu đó và điều chỉnh sao cho tần suất hiệu chuẩn thiết bị lần tới trong khoảng thời gian như những lần trước. Tần suất hiệu chuẩn cho các thiết bị đo điện phổ biết nhất là 1 năm một lần.",
                  },
                  {
                    question:
                      "Intest tư vấn, đánh giá những dây chuyền công nghệ, thiết bị sản xuất nào?",
                    answer:
                      "Intest có đội ngũ với nhiều kinh nghiệm trong việc tư vấn, đánh giá các dây chuyền công nghệ, thiết bị sản xuất dược phẩm, thực phẩm chức năng, mỹ phẩm, thực phẩm.",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    onClick={() => toggleQuestion(index)}
                    style={{
                      padding: "15px 20px",
                      borderBottom: "1px solid #ddd",
                      cursor: "pointer",
                      backgroundColor: "#fff",
                      color: "#222",
                      fontSize: "18px",
                    }}
                  >
                    ➤ {item.question}
                    {expandedQuestion === index && (
                      <p
                        style={{
                          marginTop: "10px",
                          fontSize: "16px",
                          color: "#555",
                          lineHeight: "1.8",
                        }}
                      >
                        {item.answer}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="inform-question">
            <div className="elementor-widget-wrap">
              <div className="elementor-background-overlay">
                <div className="question-heading">
                  <h2 class="elementor-heading-title elementor-size-default">
                    Liên hệ với Mitest
                  </h2>
                </div>
                <div className="form-input">
                  <div className="wpforms-field-container">
                    <div
                      id="wpforms-327-field_0-container"
                      class="wpforms-field wpforms-field-name"
                      data-field-id="0"
                    >
                      <input
                        type="text"
                        id="wpforms-327-field_0"
                        class="wpforms-field-large"
                        name="wpforms[fields][0]"
                        placeholder="Họ và tên"
                      ></input>
                    </div>
                    <div
                      id="wpforms-327-field_0-container"
                      class="wpforms-field wpforms-field-name"
                      data-field-id="0"
                    >
                      <input
                        type="text"
                        id="wpforms-327-field_0"
                        class="wpforms-field-large"
                        name="wpforms[fields][0]"
                        placeholder="Số điện thoại"
                      ></input>
                    </div>
                    <div
                      id="wpforms-327-field_0-container"
                      class="wpforms-field wpforms-field-name"
                      data-field-id="0"
                    >
                      <textarea
                        id="wpforms-327-field_2"
                        class="wpforms-field-small"
                        name="wpforms[fields][2]"
                        placeholder="Bạn có nhắn nhủ gì với chúng tôi?!"
                        spellcheck="false"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="elementor-customer-feedback">
        <div className="elementor-container-feedback ">
          <div className="feedback-content-contailer">
            <div className="feedback-title ">
              <h2 class="elementor-heading-title elementor-size-default">
                Cảm nhận của khách hàng!
              </h2>
            </div>
            <div className="feedback-detail">
              <div className="feedback-content-colum">
                <div className="feedback-widget-wrap">
                  <div className="feedback-rating">
                    <div
                      class="elementor-star-rating"
                      title="4.9/5"
                      itemtype="http://schema.org/Rating"
                      itemscope=""
                      itemprop="reviewRating"
                    >
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-9"></i>{" "}
                    </div>
                  </div>
                  <div className="feedback-content">
                    <div class="elementor-testimonial-content">
                      Tôi đã tin tưởng và sử dụng dịch vụ hiểu chuẩn thiết bị
                      của Mitest nhiều năm nay. Dịch vụ nhanh chóng, chính xác,
                      giá cả cạnh tranh.
                    </div>
                  </div>
                  <div className="feedback-name">
                    <div class="elementor-testimonial-name">
                      Nguyễn Minh Tới
                    </div>
                  </div>
                </div>
              </div>
              <div className="feedback-content-colum">
                {" "}
                <div className="feedback-widget-wrap">
                  <div className="feedback-rating">
                    <div
                      class="elementor-star-rating"
                      title="4.9/5"
                      itemtype="http://schema.org/Rating"
                      itemscope=""
                      itemprop="reviewRating"
                    >
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-9"></i>{" "}
                    </div>
                  </div>
                  <div className="feedback-content">
                    <div class="elementor-testimonial-content">
                      Tôi đã tin tưởng và sử dụng dịch vụ hiểu chuẩn thiết bị
                      của Mitest nhiều năm nay. Dịch vụ nhanh chóng, chính xác,
                      giá cả cạnh tranh.
                    </div>
                  </div>
                  <div className="feedback-name">
                    <div class="elementor-testimonial-name">
                      Nguyễn Minh Tới
                    </div>
                  </div>
                </div>
              </div>
              <div className="feedback-content-colum">
                {" "}
                <div className="feedback-widget-wrap">
                  <div className="feedback-rating">
                    <div
                      class="elementor-star-rating"
                      title="4.9/5"
                      itemtype="http://schema.org/Rating"
                      itemscope=""
                      itemprop="reviewRating"
                    >
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-9"></i>{" "}
                    </div>
                  </div>
                  <div className="feedback-content">
                    <div class="elementor-testimonial-content">
                      Tôi đã tin tưởng và sử dụng dịch vụ hiểu chuẩn thiết bị
                      của Mitest nhiều năm nay. Dịch vụ nhanh chóng, chính xác,
                      giá cả cạnh tranh.
                    </div>
                  </div>
                  <div className="feedback-name">
                    <div class="elementor-testimonial-name">
                      Nguyễn Minh Tới
                    </div>
                  </div>
                </div>
              </div>
              <div className="feedback-content-colum">
                <div className="feedback-widget-wrap">
                  <div className="feedback-rating">
                    <div
                      class="elementor-star-rating"
                      title="4.9/5"
                      itemtype="http://schema.org/Rating"
                      itemscope=""
                      itemprop="reviewRating"
                    >
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-full"></i>
                      <i class="elementor-star-9"></i>{" "}
                    </div>
                  </div>
                  <div className="feedback-content">
                    <div class="elementor-testimonial-content">
                      Tôi đã tin tưởng và sử dụng dịch vụ hiểu chuẩn thiết bị
                      của Mitest nhiều năm nay. Dịch vụ nhanh chóng, chính xác,
                      giá cả cạnh tranh.
                    </div>
                  </div>
                  <div className="feedback-name">
                    <div class="elementor-testimonial-name">
                      Nguyễn Minh Tới
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="element element-new">
        <div className="new-title">
          <h2 class="uael-heading">
            <span>TIN TỨC</span>
          </h2>
          <div className="uael-separator"></div>
        </div>
        <div className="new-container">
          <div className="new-colums">
            <div class="thumbnail-img">
              <img src="https://mitest.vn/wp-content/uploads/2025/01/MAY-DO-DO-AM-VL-4.jpg"></img>
            </div>
            <div className="thumbnail-title">
              <h3>
                <a>HIỆU CHUẨN MÁY ĐO ĐỘ ẨM</a>
              </h3>
            </div>
          </div>
          <div className="new-colums">
            <div class="thumbnail-img">
              <img src="https://mitest.vn/wp-content/uploads/2025/01/MAY-DO-DO-AM-VL-4.jpg"></img>
            </div>
            <div className="thumbnail-title">
              <h3>
                <a>HIỆU CHUẨN MÁY ĐO ĐỘ ẨM</a>
              </h3>
            </div>
          </div>
          <div className="new-colums">
            <div class="thumbnail-img">
              <img src="https://mitest.vn/wp-content/uploads/2025/01/MAY-DO-DO-AM-VL-4.jpg"></img>
            </div>
            <div className="thumbnail-title">
              <h3>
                <a>HIỆU CHUẨN MÁY ĐO ĐỘ ẨM</a>
              </h3>
            </div>
          </div>
          <div className="new-colums">
            <div class="thumbnail-img">
              <img src="https://mitest.vn/wp-content/uploads/2025/01/MAY-DO-DO-AM-VL-4.jpg"></img>
            </div>
            <div className="thumbnail-title">
              <h3>
                <a>HIỆU CHUẨN MÁY ĐO ĐỘ ẨM</a>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <section className="elementor-inner-section">
        <div className="elementor-container-feedback ">
          <div className="elementor-inner-contailer">
            <div>
              <h2 class="elementor-heading-title elementor-size-default">
              NHỮNG CON SỐ ẤN TƯỢNG
              </h2>
            </div>
            <div className="elementor-inner-number">
              <h2 class="elementor-heading-title elementor-size-default">
              10+
              </h2>
              <span>
                Kinh nghiệm
              </span>
            </div>
            <div  className="elementor-inner-number">
              <h2 class="elementor-heading-title elementor-size-default">
              150+
              
              </h2>
              <span>
                Dự Án
              </span>
            </div>
            <div  className="elementor-inner-number">
              <h2 class="elementor-heading-title elementor-size-default">
              99%
              </h2>
              <span>
               Khách hàng hài lòng
              </span>
            </div>
          </div>
        </div>
      </section>

      <NewSection />
    </div>
  );
}

export default HomePage;
