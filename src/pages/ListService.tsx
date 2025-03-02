import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

interface Post {
  id: string;
  title: string;
  image: string;
  content: string;
  updatedAt: string;
  category: string; // New field to store service type (category)
}

export default function ServiceList() {
  const [services, setPosts] = useState<Post[]>([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<
    string | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/v1/services", {
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

  const handleDelete = (id: string) => {
    setShowDeleteConfirmation(id);
  };

  const confirmDelete = async (id: string) => {
    try {
      await axios.delete(`/v1/services/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(services.filter((service) => service.id !== id));
      setShowDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(null);
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-service/${id}`);
  };

  const handleAddService = () => {
    navigate("/add-service"); // Navigate to the "Add Service" page
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
          Thêm dịch vụ
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
              Loại Dịch Vụ {/* New column for service type */}
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
          {services.map((service) => (
            <tr
              key={service.id}
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
                {new Date(service.updatedAt).toLocaleDateString()}
              </td>
              <td
                style={{
                  padding: "2px",
                  textAlign: "left",
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
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
                onClick={() => navigate(`/detail-service/${service.id}`)}
              >
                {service.title}
              </td>
              <td
                style={{
                  padding: "2px",
                  textAlign: "left",
                  fontSize: "16px",
                }}
              >
                {service.category} {/* Display service type */}
              </td>
              <td
                style={{
                  padding: "2px",
                  textAlign: "center",
                }}
              >
                {showDeleteConfirmation === service.id ? (
                  <div>
                    <p>Bạn có chắc chắn muốn xoá dịch vụ này?</p>
                    <button
                      onClick={() => confirmDelete(service.id)}
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
                      onClick={() => handleEdit(service.id)}
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
                      onClick={() => handleDelete(service.id)}
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
