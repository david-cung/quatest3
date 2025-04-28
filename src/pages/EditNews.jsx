import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNews() {
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
    const fetchNewsDetails = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/v1/news/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!res.ok) {
          throw new Error("Failed to fetch news details");
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
        console.error("Error fetching news:", error);
        setFetchError(error.message || "Failed to load news details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchNewsDetails();
    }
  }, [id]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Hãy chọn ít nhất một ảnh");
        return;
      }
      
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          console.error("Upload error:", error);
          setImageUploadError("Không thể tải ảnh lên. Vui lòng thử lại.");
          setImageFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageFileUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: url });
          });
        }
      );
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
      
      const res = await fetch(`/api/v1/news/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to update news");
      }
      
      // Navigate to detail page after successful update
      navigate(`/news/${id}`, { replace: true });
    } catch (error) {
      console.error("Update error:", error);
      setUpdateError(error.message || "Không thể cập nhật tin tức");
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
      <h1 className="text-center text-3xl my-7 font-semibold">Cập nhật tin tức</h1>
      
      <form
        className="flex flex-col gap-4"
        style={{ minHeight: "calc(100vh - 120px)" }}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Nhập tiêu đề"
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
              alt="News preview"
              className="w-full h-72 object-cover rounded"
            />
          </div>
        )}

        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Nội dung tin tức:</p>
          <ReactQuill
            theme="snow"
            placeholder="Nhập nội dung..."
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