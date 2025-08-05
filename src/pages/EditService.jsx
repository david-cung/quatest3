import { Alert, Button, FileInput, TextInput } from "flowbite-react";
import { useEffect, useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";

export default function EditService() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const quillRef = useRef(null);

  // Function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    
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
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // Function to upload image to server
  const uploadImageToServer = async (file) => {
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('https://intest.vn/api/v1/upload/image', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      const imageUrl = result.data?.url;
      
      if (!imageUrl) {
        throw new Error('No image URL returned from server');
      }

      return imageUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  // Custom image handler for ReactQuill
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          // Show loading state
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertText(range.index, 'Đang tải ảnh...', 'user');
          
          // Upload image
          const imageUrl = await uploadImageToServer(file);
          
          // Remove loading text and insert image
          quill.deleteText(range.index, 'Đang tải ảnh...'.length);
          quill.insertEmbed(range.index, 'image', imageUrl);
          quill.setSelection(range.index + 1);
          
        } catch (error) {
          console.error('Error uploading image:', error);
          // Remove loading text if upload fails
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.deleteText(range.index, 'Đang tải ảnh...'.length);
          
          // Show error message
          setImageUploadError('Không thể tải ảnh lên. Vui lòng thử lại.');
          setTimeout(() => setImageUploadError(null), 3000);
        }
      }
    };
  };

  // ReactQuill modules with custom toolbar
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
    'align',
    'link', 'image', 'video'
  ];

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);

        const token = localStorage.getItem("token") || localStorage.getItem("authToken");
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await fetch(`/api/v1/services/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!res.ok) {
          if (res.status === 401) {
            handleUnauthorized();
            return;
          }
          throw new Error(`HTTP ${res.status}: Failed to fetch service details`);
        }
        
        const data = await res.json();
        console.log("Fetched service data:", data);
        
        if (data && data.data) {
          setFormData({
            title: data.data.title || "",
            image: data.data.image || "",
            content: data.data.content || "",
          });
          setFetchError(null);
        } else {
          throw new Error("Invalid data format received from server");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        setFetchError(error.message || "Failed to load service details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchServiceDetails();
    }
  }, [id, navigate]);

  // Validate file before upload
  const validateFile = (file) => {
    if (!file) {
      return "Hãy chọn ít nhất một ảnh";
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return "Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WebP)";
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return "Kích thước file không được vượt quá 5MB";
    }

    return null;
  };

  const handleUploadImage = async () => {
    try {
      // Reset previous errors
      setImageUploadError(null);
      
      // Validate file
      const validationError = validateFile(file);
      if (validationError) {
        setImageUploadError(validationError);
        return;
      }
      
      setIsUploading(true);
      setImageFileUploadProgress(0);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setImageFileUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Upload image using the same method as CreateService
      const imageUrl = await uploadImageToServer(file);
      
      clearInterval(progressInterval);
      setImageFileUploadProgress(100);
      setFormData(prevData => ({ ...prevData, image: imageUrl }));
      setImageUploadError(null);
      setFile(null); // Clear file input
      
      // Reset progress after 1 second
      setTimeout(() => {
        setImageFileUploadProgress(null);
      }, 1000);

    } catch (error) {
      console.error("Image upload error:", error);
      setImageUploadError("Image upload failed");
      setImageFileUploadProgress(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.title.trim()) {
      setUpdateError("Tiêu đề không được để trống");
      return;
    }
    
    if (!formData.content || formData.content.trim() === '<p><br></p>' || formData.content.trim() === '') {
      setUpdateError("Nội dung không được để trống");
      return;
    }
    
    try {
      setUpdateError(null);
      const token = localStorage.getItem("token") || localStorage.getItem("authToken");
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      const res = await fetch(`/api/v1/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          handleUnauthorized();
          return;
        }
        
        let errorMessage = "Failed to update service";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Use default error message
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await res.json();
      console.log("Update response:", data);
      
      // Navigate to detail page after successful update
      navigate(`/detail-service/${id}`, { replace: true });
    } catch (error) {
      console.error("Update error:", error);
      setUpdateError(error.message || "Không thể cập nhật dịch vụ");
    }
  };

  const handleContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target?.files?.length ? e.target?.files[0] : null;
    setFile(selectedFile);
    
    // Clear previous errors when new file is selected
    if (selectedFile) {
      setImageUploadError(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen flex items-center justify-center" style={{ paddingTop: "70px" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen" style={{ paddingTop: "70px" }}>
        <Alert color="failure" className="mb-4">
          <p className="font-medium">Lỗi khi tải dữ liệu:</p>
          <p>{fetchError}</p>
        </Alert>
        <div className="flex gap-2">
          <Button onClick={() => navigate(-1)}>Quay lại</Button>
          <Button color="blue" onClick={() => window.location.reload()}>Thử lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-3 max-w-3xl mx-auto min-h-screen"
      style={{ paddingTop: "70px" }}
    >
      <h1 className="text-center text-3xl my-7 font-semibold">Cập nhật dịch vụ</h1>
      
      <form
        className="flex flex-col gap-4"
        style={{ minHeight: "calc(100vh - 120px)" }}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Nhập tiêu đề dịch vụ"
            id="title"
            className="flex-1"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        {/* Upload featured image section */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <div className="flex-1">
            <FileInput
              accept="image/*"
              onChange={handleFileChange}
            />
            {file && (
              <p className="text-sm text-gray-600 mt-1">
                Đã chọn: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={isUploading || imageUploadProgress !== null}
          >
            {imageUploadProgress !== null ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%`}
                />
              </div>
            ) : isUploading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                Đang tải...
              </div>
            ) : (
              "Thêm ảnh đại diện"
            )}
          </Button>
        </div>

        {imageUploadError && (
          <Alert className="mt-2" color="failure">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {imageUploadError}
            </div>
          </Alert>
        )}

        {/* Show uploaded featured image */}
        {formData.image && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">Ảnh đại diện hiện tại:</p>
            <img
              src={formData.image}
              alt="Service preview"
              className="w-full h-72 object-cover rounded border"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
              }}
            />
          </div>
        )}

        {/* Content editor with image upload capability */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Nội dung dịch vụ (Bạn có thể thêm hình ảnh trực tiếp bằng cách nhấn vào icon hình ảnh trên thanh công cụ):
          </p>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            placeholder="Nhập nội dung dịch vụ..."
            value={formData.content}
            className="h-72 mb-12"
            modules={modules}
            formats={formats}
            onChange={handleContentChange}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded"
            disabled={isUploading}
          >
            {isUploading ? 'Đang xử lý...' : 'Cập nhật'}
          </Button>

          <Button
            type="button"
            className="bg-gray-500 text-white p-2 rounded"
            onClick={() => navigate(-1)}
            disabled={isUploading}
          >
            Huỷ bỏ
          </Button>
        </div>

        {updateError && (
          <Alert className="mt-4" color="failure">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {updateError}
            </div>
          </Alert>
        )}
      </form>
    </div>
  );
}