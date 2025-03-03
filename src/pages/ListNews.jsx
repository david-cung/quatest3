import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewsList() {
  const [services, setPosts] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/v1/news", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = (id) => {
    setShowDeleteConfirmation(id);
  };

  const confirmDelete = async (id) => {
    try {
      await axios.delete(`/v1/services/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(services.filter((news) => news.id !== id));
      setShowDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(null);
  };

  const handleEdit = (id) => {
    navigate(`/edit-news/${id}`);
  };

  const handleAddService = () => {
    navigate("/add-news"); // Navigate to the "Add Service" page
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
      }}
    >
      {/* Top section with "Add Service" button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 20px",
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #ddd",
        }}
      >
        <button
          onClick={handleAddService}
          style={{
            padding: "10px 15px",
            backgroundColor: "#20C997",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Thêm tin tức
        </button>
      </div>

      {/* Posts Table */}
      <table
        style={{
          width: "100%",
          height: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "2px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Ngày Cập Nhật
            </th>
            <th
              style={{
                padding: "2px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Hình Ảnh
            </th>
            <th
              style={{
                padding: "2px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Tiêu Đề
            </th>
            <th
              style={{
                padding: "2px",
                textAlign: "left",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Loại Tin tức {/* New column for service type */}
            </th>
            <th
              style={{
                padding: "2px",
                textAlign: "center",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Thao Tác
            </th>
          </tr>
        </thead>
        <tbody>
          {services.map((news) => (
            <tr
              key={news.id}
              style={{
                borderBottom: "0.5px solid #ddd",
                padding: "2px",
              }}
            >
              <td
                style={{
                  padding: "2px",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                {new Date(news.updatedAt).toLocaleDateString()}
              </td>
              <td
                style={{
                  padding: "2px",
                  textAlign: "left",
                }}
              >
                <img
                  src={news.image}
                  alt={news.title}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td
                style={{
                  padding: "2px",
                  textAlign: "left",
                  fontSize: "16px",
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
                onClick={() => navigate(`/detail-service/${news.id}`)}
              >
                {news.title}
              </td>
              <td
                style={{
                  padding: "2px",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                {news.category} {/* Display service type */}
              </td>
              <td
                style={{
                  padding: "2px",
                  textAlign: "center",
                }}
              >
                {showDeleteConfirmation === news.id ? (
                  <div>
                    <p>Bạn có chắc chắn muốn xoá dịch vụ này?</p>
                    <button
                      onClick={() => confirmDelete(news.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#FF5733",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Xoá dịch vụ này
                    </button>
                    <button
                      onClick={cancelDelete}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#808080",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Huỷ
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(news.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#FFA500",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Chỉnh Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(news.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#FF5733",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Xoá
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
