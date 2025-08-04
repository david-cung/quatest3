import { Alert, Button, FileInput, TextInput } from "flowbite-react";
import { useState, useRef, useMemo } from "react";
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
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const quillRef = useRef(null);

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

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Hãy chọn ít nhất một ảnh");
        return;
      }
      setImageUploadError(null);
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

      const imageUrl = await uploadImageToServer(file);
      
      clearInterval(progressInterval);
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
      
      // Include content in formData
      const submitData = {
        ...formData,
        content: content
      };

      const res = await fetch("/api/v1/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
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
    setContent(value);
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
        </div>

        {/* Upload featured image section */}
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
              "Tải ảnh lên"
            )}
          </Button>
        </div>

        {/* Show image upload error */}
        {imageUploadError && (
          <Alert className='mt-5' color='failure'>
            {imageUploadError}
          </Alert>
        )}

        {/* Show uploaded featured image */}
        {formData.image && (
          <div className='relative'>
            <p className='text-sm text-gray-600 mb-2'>Ảnh đại diện:</p>
            <img
              src={formData.image}
              alt='featured image'
              className='w-full h-72 object-cover rounded'
            />
          </div>
        )}

        {/* Content editor with image upload capability */}
        <div>
          <p className='text-sm text-gray-600 mb-2'>
            Nội dung (Bạn có thể thêm hình ảnh trực tiếp bằng cách nhấn vào icon hình ảnh trên thanh công cụ):
          </p>
          <ReactQuill
            ref={quillRef}
            theme='snow'
            value={content}
            placeholder='Nhập nội dung...'
            className='h-72 mb-12'
            modules={modules}
            formats={formats}
            onChange={handleContentChange}
          />
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