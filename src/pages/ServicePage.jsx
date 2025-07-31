import { useEffect, useState } from "react";

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Navigation function
  const navigate = (path) => {
    console.log(`Navigate to: ${path}`);
    // Use window.location for actual navigation
    window.location.href = path;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/v1/services");
        const data = await response.json();
        setServices(data);
      } catch (err) {
        // Mock data for demo
        setServices({
          data: [
            {
              id: 1,
              title: "Dịch vụ thử nghiệm vật liệu",
              image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
              content: "Thực hiện các thử nghiệm chất lượng vật liệu xây dựng theo tiêu chuẩn quốc gia và quốc tế. Chúng tôi cung cấp dịch vụ kiểm định chất lượng bê tông, thép, gạch và các vật liệu khác."
            },
            {
              id: 2,
              title: "Kiểm định chất lượng công trình",
              image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
              content: "Đánh giá và kiểm định chất lượng các công trình xây dựng, đảm bảo tuân thủ các quy chuẩn kỹ thuật và an toàn. Dịch vụ bao gồm kiểm tra kết cấu, hệ thống điện, nước và PCCC."
            },
            {
              id: 3,
              title: "Thử nghiệm môi trường",
              image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
              content: "Phân tích và đánh giá tác động môi trường, giám sát chất lượng không khí, nước và đất. Cung cấp báo cáo đánh giá tác động môi trường theo quy định pháp luật."
            },
            {
              id: 4,
              title: "Đo đạc và khảo sát địa chất",
              image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop",
              content: "Thực hiện các công tác đo đạc địa hình, khảo sát địa chất phục vụ thiết kế và thi công công trình. Sử dụng thiết bị hiện đại để đảm bảo độ chính xác cao."
            },
            {
              id: 5,
              title: "Kiểm tra an toàn lao động",
              image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop",
              content: "Đánh giá và kiểm tra điều kiện an toàn lao động tại các công trình xây dựng. Tư vấn các giải pháp đảm bảo an toàn cho người lao động trong quá trình thi công."
            },
            {
              id: 6,
              title: "Thử nghiệm thiết bị điện",
              image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
              content: "Kiểm tra và thử nghiệm các thiết bị điện, hệ thống điện trong công trình. Đảm bảo tính an toàn và hiệu quả của hệ thống điện theo tiêu chuẩn kỹ thuật."
            },
            {
              id: 7,
              title: "Tư vấn tiêu chuẩn chất lượng",
              image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
              content: "Cung cấp dịch vụ tư vấn về các tiêu chuẩn chất lượng trong xây dựng. Hỗ trợ doanh nghiệp xây dựng hệ thống quản lý chất lượng theo ISO và các tiêu chuẩn khác."
            }
          ]
        });
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleReadMore = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error && !services?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="pt-20 sm:pt-28 lg:pt-32 pb-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fadeInDown">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-800 mb-4">
              Dịch vụ
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              INTEST 3 thực hiện các hoạt động cung cấp dịch vụ kỹ thuật theo các
              lĩnh vực tiêu chuẩn đo lường chất lượng.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services?.data?.map((service, idx) => (
              <div
                key={service.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${service.image})`,
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {service.title}
                  </h3>
                  
                  <div className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed line-clamp-4">
                    {service.content?.replace(/<[^>]*>/g, '').slice(0, 150)}...
                  </div>

                  <button
                    onClick={() => handleReadMore(service.id)}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Đọc tiếp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {(!services?.data || services.data.length === 0) && !loading && (
        <div className="py-20 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Chưa có dịch vụ nào
          </h3>
          <p className="text-gray-500">
            Dịch vụ sẽ được cập nhật sớm
          </p>
        </div>
      )}

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

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ServicePage;