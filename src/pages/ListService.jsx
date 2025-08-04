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

  // Function to get auth headers with token from localStorage
  const getAuthHeaders = () => {
     const token = localStorage.getItem("token");
    
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  };

  // Function to handle unauthorized access
  const handleUnauthorized = () => {
    console.error("Unauthorized: Token may be expired or invalid");
    // Clear invalid token
    localStorage.removeItem('authToken');
    // Redirect to sign-in page
    window.location.href = '/sign-in';
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Check if token exists
         const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No auth token found, redirecting to sign-in");
          window.location.href = '/sign-in';
          return;
        }

        // Replace with your actual API endpoint
        const response = await fetch("/api/v1/services", {
          headers: getAuthHeaders(),
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            handleUnauthorized();
            return;
          }
          throw new Error('Failed to fetch services');
        }
        
        const data = await response.json();
        setServices(data.data || data); // Handle different response structures
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setIsLoading(false);
        
        // Optional: Show error message to user
        // You can add a toast notification here
        alert('Có lỗi xảy ra khi tải dữ liệu dịch vụ: ' + error.message);
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
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          handleUnauthorized();
          return;
        }
        if (response.status === 403) {
          throw new Error('Bạn không có quyền xóa dịch vụ này');
        }
        throw new Error('Failed to delete service');
      }
      
      // Remove from local state
      setServices(services.filter((service) => service.id !== id));
      setShowDeleteConfirmation(null);
      
      // Optional: Show success message
      console.log('Service deleted successfully');
      
    } catch (error) {
      console.error("Error deleting service:", error);
      setShowDeleteConfirmation(null);
      
      // Show error message to user
      alert('Có lỗi xảy ra khi xóa dịch vụ: ' + error.message);
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

  // Show loading state
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 animate-fadeInDown">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 backdrop-blur-sm bg-opacity-90">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  Quản lý Dịch vụ
                </h1>
                <p className="text-gray-600">
                  Tổng cộng {services.length} dịch vụ
                </p>
              </div>
              <button
                onClick={handleAddService}
                className="group relative px-4 sm:px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Thêm dịch vụ
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden animate-fadeInUp w-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    // Fallback image if image fails to load
                    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                  }}
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
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>

                <h3 
                  className="text-lg sm:text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300 cursor-pointer line-clamp-2"
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
                    <p className="text-center text-gray-700 mb-4 font-medium text-sm sm:text-base">
                      Bạn có chắc chắn muốn xoá?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => confirmDelete(service.id)}
                        className="flex-1 px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 font-medium text-sm sm:text-base"
                      >
                        Xác nhận
                      </button>
                      <button
                        onClick={cancelDelete}
                        className="flex-1 px-3 sm:px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-200 font-medium text-sm sm:text-base"
                      >
                        Huỷ
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service.id)}
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transform hover:scale-105 transition-all duration-200 font-medium text-sm sm:text-base"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 font-medium text-sm sm:text-base"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      Xoá
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {services.length === 0 && !isLoading && (
          <div className="text-center py-12 animate-fadeIn">
            <div className="w-20 sm:w-24 h-20 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Tag className="w-10 sm:w-12 h-10 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
              Chưa có dịch vụ nào
            </h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              Hãy thêm dịch vụ đầu tiên của bạn
            </p>
            <button
              onClick={handleAddService}
              className="px-4 sm:px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}