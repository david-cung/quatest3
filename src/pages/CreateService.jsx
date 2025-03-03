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
  const [contentBlocks, setContentBlocks] = useState([]);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleAddTextBlock = (text) => {
    setContentBlocks((prevBlocks) => [
      ...prevBlocks,
      { type: "text", content: text },
    ]);
  };

  const handleAddImageBlock = async () => {
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
          setImageFileUploadProgress(progress);
        },
        (error) => {
          console.log("err", error);
          setImageUploadError("Image upload failed");
          setImageFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageFileUploadProgress(null);
            setContentBlocks((prevBlocks) => [
              ...prevBlocks,
              { type: "image", content: url },
            ]);
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
      const res = await fetch("/v1/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, contentBlocks }),
      });
      if (!res.ok) {
        setPublishError("Failed to publish services");
        return;
      }
      setPublishError(null);
      navigate(`/dashboard?tab=services`, { replace: true });
    } catch (error) {
      setPublishError(error.message);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div
      className='p-3 max-w-3xl mx-auto min-h-screen'
      style={{ paddingTop: "60px" }}
    >
      <h1 className='text-center text-3xl my-7 font-semibold'>Tạo dịch vụ</h1>
      <form
        className='flex flex-col gap-4'
        style={{ minHeight: "calc(100vh - 120px)" }}
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
            <option value='Hiệu chuẩn, kiểm định'>Hiệu chuẩn, kiểm định</option>
            <option value='Hiệu chuẩn tận nơi'>Hiệu chuẩn tận nơi</option>
            <option value='Đào tạo và huấn luyện'>Đào tạo và huấn luyện</option>
            <option value='Bảo trì-sửa chữa'>Bảo trì-sửa chữa</option>
          </Select>
        </div>

        {/* Add content blocks */}
        <div className='flex flex-col gap-4 border p-4'>
          <ReactQuill
            theme='snow'
            placeholder='Nhập nội dung...'
            className='mb-4'
            onChange={(value) => handleAddTextBlock(value)}
          />
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
            onClick={handleAddImageBlock}
            disabled={imageUploadProgress !== null}
          >
            {imageUploadProgress !== null ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress.toFixed(0)}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>

          {imageUploadError && (
            <Alert color='failure' className='mt-4'>
              {imageUploadError}
            </Alert>
          )}
        </div>

        {/* Preview content blocks */}
        <div className='mt-4'>
          {contentBlocks.map((block, index) => (
            <div key={index} className='my-4'>
              {block.type === "text" ? (
                <div dangerouslySetInnerHTML={{ __html: block.content }} />
              ) : (
                <img
                  src={block.content}
                  alt='Uploaded'
                  className='w-full h-auto'
                />
              )}
            </div>
          ))}
        </div>

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
