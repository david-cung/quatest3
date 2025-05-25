import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreateService() {
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
          console.log(error);
          setImageUploadError("Image upload failed");
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
      setImageUploadError("Image upload failed");
      setImageFileUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/v1/services", {
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
      navigate(`/dashboard?tab=services`, { replace: true });
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
      className='p-3 max-w-3xl mx-auto min-h-screen mt-5'
      style={{ paddingTop: "60px" }} // Khoảng cách để tránh bị header che khuất
    >
      <h1 className='text-center text-3xl my-7 font-semibold'>Tạo dịch vụ</h1>
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

          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Loại dịch vụ</option>
            <option value='calibration'>Hiệu chuẩn, kiểm định</option>
            <option value='on-site'>Hiệu chuẩn tận nơi</option>
            <option value='training'>Đào tạo và huấn luyện</option>
            <option value='maintenance'>Bảo trì-sửa chữa</option>
          </Select>
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
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%`}
                />
              </div>
            ) : (
              "Thêm hình ảnh"
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
