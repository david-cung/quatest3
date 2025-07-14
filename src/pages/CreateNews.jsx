import { Alert, Button, FileInput, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreateNews() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Hãy chọn ít nhất một ảnh");
        return;
      }
      setImageUploadError(null);
      setImageFileUploadProgress(0);

      // Tạo FormData để gửi file
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      // Gọi API upload
      const response = await fetch('https://intest.vn/api/v1/upload/image', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      // Lấy URL từ response theo cấu trúc API
      const imageUrl = result.data?.url;
      
      if (!imageUrl) {
        throw new Error('No image URL returned from server');
      }

      setImageFileUploadProgress(100);
      setFormData({ ...formData, image: imageUrl });
      
      // Reset progress sau 1 giây
      setTimeout(() => {
        setImageFileUploadProgress(null);
      }, 1000);

    } catch (error) {
      console.log(error);
      setImageUploadError("Image upload failed");
      setImageFileUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/v1/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError("Failed to publish post");
        return;
      }
      console.log(data);
      setPublishError(null);
      navigate(`/dashboard?tab=news`, { replace: true });
    } catch (error) {
      setPublishError(error.message);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  const handleContentChange = (value) => {
    const cleanedContent = value.trim().replace(/^<p>(.*?)<\/p>$/s, "$1");
    setFormData((prevData) => ({
      ...prevData,
      content: cleanedContent,
    }));
  };

  return (
    <div
      className='p-3 max-w-3xl mx-auto min-h-screen'
      style={{ paddingTop: "60px" }} // Khoảng cách để tránh bị header che khuất
    >
      <h1 className='text-center text-3xl my-7 font-semibold'>Tạo tin tức</h1>
      <form
        className='flex flex-col gap-4'
        style={{ minHeight: "calc(100vh - 120px)" }} // Giảm chiều cao của phần header và tạo đủ không gian cho form
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Nhập tiêu đề'
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          {/* <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Loại dịch vụ</option>
            <option value='Hiệu chuẩn, kiểm định'>Hiệu chuẩn, kiểm định</option>
            <option value='Hiệu chuẩn tận nơi'>Hiệu chuẩn tận nơi</option>
            <option value='Đào tạo và huấn luyện'>Đào tạo và huấn luyện</option>
            <option value='Bảo trì-sửa chữa'>Bảo trì-sửa chữa</option>
          </Select> */}
        </div>

        {/* Upload image section */}
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            accept='image/*'
            onChange={(e) =>
              setFile(e.target?.files?.length ? e.target?.files[0] : null)
            }
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress !== null}
          >
            {imageUploadProgress !== null ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {/* Show image upload error */}
        {imageUploadError && (
          <Alert className='mt-5' color='failure'>
            {imageUploadError}
          </Alert>
        )}

        {/* Show uploaded image */}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}

        {/* Content editor */}
        <ReactQuill
          theme='snow'
          placeholder='Nhập nội dung...'
          className='h-72 mb-12'
          onChange={handleContentChange}
        />

        {/* Publish button */}
        <Button
          type='submit'
          className='bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded mt-5'
        >
          Tạo mới
        </Button>

        {/* Cancel button */}
        <Button
          type='button'
          className='bg-gray-500 text-white p-2 rounded mt-2'
          onClick={handleCancel}
        >
          Hủy bỏ
        </Button>

        {/* Show publish error */}
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}