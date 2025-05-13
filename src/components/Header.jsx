import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ServicePage = () => {
  const [serviceData, setServiceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('all');
  
  const location = useLocation();
  
  // Extract category from URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category') || 'all';
    setCurrentCategory(category);
    
    // Fetch data based on the URL parameter
    loadServiceData(category);
  }, [location.search]);
  
  // Listen for content reload events from Header component
  useEffect(() => {
    const handleContentReload = (event) => {
      if (event.detail) {
        // Always set the service data, even if it's empty array
        // This ensures we clear previous data when new data is empty
        setServiceData(event.detail.data || []);
        setCurrentCategory(event.detail.category);
        setIsLoading(false);
        setError(null);
        
        console.log("Content reload event received with data:", event.detail.data);
      }
    };
    
    window.addEventListener('contentReload', handleContentReload);
    
    return () => {
      window.removeEventListener('contentReload', handleContentReload);
    };
  }, []);
  
  // Function to load service data
  const loadServiceData = async (category) => {
    try {
      setIsLoading(true);
      
      // Clear existing data first to prevent showing stale data
      setServiceData(null);
      
      // Construct the appropriate URL based on category
      const url = category && category !== 'all' 
        ? `/api/v1/services?category=${category}`
        : '/api/v1/services';
        
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Disable cache to always get fresh data
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Data loaded for category ${category}:`, data);
      
      // Even if data is an empty array, we set it to state
      setServiceData(data);
      setError(null);
    } catch (error) {
      console.error('Error loading service data:', error);
      setError('Không thể tải dữ liệu dịch vụ. Vui lòng thử lại sau.');
      // Set empty array to clear previous data
      setServiceData([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to render service content based on category
  const renderServiceContent = () => {
    // Show loading spinner while fetching data
    if (isLoading) {
      return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
    }
    
    // Show error message if there's an error
    if (error) {
      return <div className="text-center text-red-500 p-4">{error}</div>;
    }
    
    // Check explicitly for empty data
    if (!serviceData) {
      return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
    }
    
    // Check for empty array
    if (Array.isArray(serviceData) && serviceData.length === 0) {
      return <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-lg text-gray-600">Không có dữ liệu dịch vụ cho danh mục này.</p>
        <p className="text-sm text-gray-500 mt-2">Vui lòng chọn một danh mục khác hoặc quay lại sau.</p>
      </div>;
    }
    
    // Example rendering based on service data
    // You'll need to modify this to match your actual data structure
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add a key with unique ID if available instead of index */}
        {serviceData.map((service, index) => (
          <div key={service.id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
            {service.image && (
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#032c57] mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              {service.features && service.features.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Tính năng:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              {service.contactInfo && (
                <div className="border-t pt-3 mt-3">
                  <p className="text-sm text-gray-500">{service.contactInfo}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Function to get category title for display
  const getCategoryTitle = () => {
    switch(currentCategory) {
      case 'calibration':
        return 'Hiệu chuẩn, kiểm định';
      case 'on-site':
        return 'Hiệu chuẩn tận nơi';
      case 'training':
        return 'Đào tạo và huấn luyện';
      case 'maintenance':
        return 'Bảo trì-sửa chữa';
      default:
        return 'Tất cả dịch vụ';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-2xl font-bold text-[#032c57] mb-6">{getCategoryTitle()}</h1>
      
      {/* Service content will be rendered here */}
      {renderServiceContent()}
    </div>
  );
};

export default ServicePage;