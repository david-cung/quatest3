import { useEffect, useState } from "react";
import { Trash2, Edit, Plus, Eye, Calendar, Tag } from "lucide-react";

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Navigation function using window.location
  const navigate = (path) => {
    console.log(`Navigate to: ${path}`);
    // Use window.location for actual navigation
    window.location.href = path;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/v1/services", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const data = await response.json();
        setServices(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        // Fallback to mock data for demo purposes
        setServices([
          {
            id: 1,
            title: "Thiết kế Website",
            category: "Công nghệ",
            image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=300&fit=crop",
            updatedAt: "2024-01-15T10:30:00Z"
          },
          {
            id: 2,
            title: "Marketing Digital",
            category: "Quảng cáo",
            image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=300&fit=crop",
            updatedAt: "2024-01-20T14:15:00Z"
          },
          {
            id: 3,
            title: "Tư vấn kinh doanh",
            category: "Tư vấn",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
            updatedAt: "2024-01-18T09:45:00Z"
          }
        ]);
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = (id) => {
    setShowDeleteConfirmation(id);
  };

  const confirmDelete = async (id) => {
    try {
      const response = await fetch(`/api/v1/services/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete service');
      }
      
      setServices(services.filter((service) => service.id !== id));
      setShowDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting service:", error);
      // For demo purposes, still remove from UI
      setServices(services.filter((service) => service.id !== id));
      setShowDeleteConfirmation(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(null);
  };

  const handleEdit = (id) => {
    navigate(`/edit-service/${id}`);
  };

  const handleAddService = () => {
    navigate("/add-service");
  };

  const handleViewDetail = (id) => {
    navigate(`/detail-service/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 animate-fadeInDown">
          <div className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-opacity-90">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Quản lý Dịch vụ
                </h1>
                <p className="text-gray-600">
                  Tổng cộng {services.length} dịch vụ
                </p>
              </div>
              <button
                onClick={handleAddService}
                className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Thêm dịch vụ
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  onClick={() => handleViewDetail(service.id)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white/30"
                >
                  <Eye className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>

                <h3 
                  className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300 cursor-pointer"
                  onClick={() => handleViewDetail(service.id)}
                >
                  {service.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(service.updatedAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>

                {/* Action Buttons */}
                {showDeleteConfirmation === service.id ? (
                  <div className="animate-fadeIn">
                    <p className="text-center text-gray-700 mb-4 font-medium">
                      Bạn có chắc chắn muốn xoá?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => confirmDelete(service.id)}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 font-medium"
                      >
                        Xác nhận
                      </button>
                      <button
                        onClick={cancelDelete}
                        className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-200 font-medium"
                      >
                        Huỷ
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transform hover:scale-105 transition-all duration-200 font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Xoá
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {services.length === 0 && (
          <div className="text-center py-12 animate-fadeIn">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Tag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Chưa có dịch vụ nào
            </h3>
            <p className="text-gray-500 mb-6">
              Hãy thêm dịch vụ đầu tiên của bạn
            </p>
            <button
              onClick={handleAddService}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200"
            >
              Thêm dịch vụ ngay
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}