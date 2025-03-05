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
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/v1/news/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch post details");
        }
        const data = await res.json();
        setFormData(data.data);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      }
    };

    fetchPost();
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
      const res = await fetch(`/api/v1/news/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        setUpdateError("Failed to update post");
        return;
      }
      navigate(`/detail-news/${id}`, { replace: true });
    } catch (error) {
      setUpdateError(error.message);
    }
  };

  const handleContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  if (fetchError) {
    return (
      <div className='p-3 max-w-3xl mx-auto'>
        <Alert color='failure'>{fetchError}</Alert>
      </div>
    );
  }

  return (
    <div
      className='p-3 max-w-3xl mx-auto min-h-screen'
      style={{ paddingTop: "70px" }}
    >
      <form
        className='flex flex-col gap-4'
        style={{ minHeight: "calc(100vh - 120px)" }}
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            id='title'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

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
              "Upload Image"
            )}
          </Button>
        </div>

        {imageUploadError && (
          <Alert className='mt-5' color='failure'>
            {imageUploadError}
          </Alert>
        )}

        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}

        <ReactQuill
          theme='snow'
          placeholder='Edit your content...'
          value={formData.content}
          className='h-72 mb-12'
          onChange={handleContentChange}
        />

        <Button
          type='submit'
          className='bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded mt-5'
        >
          Cập nhật
        </Button>

        <Button
          type='button'
          className='bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded mt-3'
          onClick={() => navigate(-1)}
        >
          Huỷ bỏ
        </Button>

        {updateError && (
          <Alert className='mt-5' color='failure'>
            {updateError}
          </Alert>
        )}
      </form>
    </div>
  );
}
