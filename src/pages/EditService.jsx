import { Alert, Button, FileInput, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/v1/services/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!res.ok) {
          throw new Error("Failed to fetch service details");
        }
        
        const data = await res.json();
        
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
  }, [id]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Hãy chọn ít nhất một ảnh");
        return;
      }
      
      setImageUploadError(null);
      setImageFileUploadProgress(0);
      
      const token = localStorage.getItem("token");
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);
      
      const xhr = new XMLHttpRequest();
      
      // Track upload progress
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        }
      });
      
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.data && response.data.url) {
              setImageFileUploadProgress(null);
              setImageUploadError(null);
              setFormData({ ...formData, image: response.data.url });
            } else {
              throw new Error("Invalid response format");
            }
          } catch (error) {
            console.error("Parse error:", error);
            setImageUploadError("Không thể tải ảnh lên. Vui lòng thử lại.");
            setImageFileUploadProgress(null);
          }
        } else {
          setImageUploadError("Không thể tải ảnh lên. Vui lòng thử lại.");
          setImageFileUploadProgress(null);
        }
      });
      
      xhr.addEventListener("error", () => {
        setImageUploadError("Không thể tải ảnh lên. Vui lòng thử lại.");
        setImageFileUploadProgress(null);
      });
      
      xhr.open("POST", "https://intest.vn/api/v1/upload/image");
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.send(formDataUpload);
      
    } catch (error) {
      console.error("Image upload error:", error);
      setImageUploadError("Không thể tải ảnh lên. Vui lòng thử lại.");
      setImageFileUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.title.trim()) {
      setUpdateError("Tiêu đề không được để trống");
      return;
    }
    
    if (!formData.content || formData.content.trim() === '<p><br></p>') {
      setUpdateError("Nội dung không được để trống");
      return;
    }
    
    try {
      setUpdateError(null);
      const token = localStorage.getItem("token");
      
      const res = await fetch(`/api/v1/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to update service");
      }
      
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
        <Button onClick={() => navigate(-1)}>Quay lại</Button>
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

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            accept="image/*"
            onChange={(e) =>
              setFile(e.target?.files?.length ? e.target?.files[0] : null)
            }
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%`}
                />
              </div>
            ) : (
              "Tải ảnh lên"
            )}
          </Button>
        </div>

        {imageUploadError && (
          <Alert className="mt-2" color="failure">
            {imageUploadError}
          </Alert>
        )}

        {formData.image && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">Ảnh hiện tại:</p>
            <img
              src={formData.image}
              alt="Service preview"
              className="w-full h-72 object-cover rounded"
            />
          </div>
        )}

        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Nội dung dịch vụ:</p>
          <ReactQuill
            theme="snow"
            placeholder="Nhập nội dung dịch vụ..."
            value={formData.content}
            className="h-72 mb-12"
            onChange={handleContentChange}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded"
          >
            Cập nhật
          </Button>

          <Button
            type="button"
            className="bg-gray-500 text-white p-2 rounded"
            onClick={() => navigate(-1)}
          >
            Huỷ bỏ
          </Button>
        </div>

        {updateError && (
          <Alert className="mt-4" color="failure">
            {updateError}
          </Alert>
        )}
      </form>
    </div>
  );
}