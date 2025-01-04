import images from "../utils/imageImports";

const { new1, new2, new3, new4, new5, new6, new7, new8 } = images;

export default function NewSection() {
    const newsData = [
        { image: new1, title: "HIỆU CHUẨN MÁY ĐO ĐỘ ẨM" },
        { image: new2, title: "HIỆU CHUẨN PAME ĐO NGOÀI" },
        { image: new3, title: "Tại sao cần hiệu chuẩn đo lường các loại cân" },
        { image: new4, title: "HIỆU CHUẨN ĐỒNG HỒ SO" },
        { image: new5, title: "HIỆU CHUẨN ĐỒNG HỒ ÁP SUẤT" },
        { image: new6, title: "HIỆU CHUẨN NHIỆT KẾ – THIẾT KẾ ĐIỆN TỬ" },
        { image: new7, title: "HIỆU CHUẨN LỰC" },
        { image: new8, title: "HIỆU CHUẨN THIẾT BỊ ĐO ĐỘ ỒN" },
    ];
    return (
        <div style={{ marginTop: "40px", padding: "20px 0", backgroundColor: "#fff" }}>
            <h2 style={{ fontSize: "26px", color: "#333", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
                TIN TỨC
            </h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                {newsData.map((news, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            overflow: "hidden",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src={news.image}
                            alt={news.title}
                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                        />
                        <h3
                            style={{
                                fontSize: "20px",
                                color: "#222",
                                padding: "15px",
                                margin: "0",
                                fontWeight: "bold",
                            }}
                        >
                            {news.title}
                        </h3>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#c21f1f",
                        color: "#fff",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                    }}
                >
                    Trang sau »
                </button>
            </div>
        </div>
    );
}
