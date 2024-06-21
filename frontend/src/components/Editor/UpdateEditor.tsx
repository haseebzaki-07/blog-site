import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { BACKEND_URL } from "../../../config"; // Adjust the import path according to your project structure
import { Appbar } from "../Appbar";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setTitle(response.data.post.title);
        setContent(response.data.post.content);
      } catch (error) {
        alert("Error while fetching blog!");
      }
    };

    fetchBlog();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const files = input.files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = () => {
          const imageUrl = reader.result;
          if (quillRef.current) {
            const quillEditor = quillRef.current.getEditor();
            const range = quillEditor.getSelection(true);
            quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
          }
        };

        reader.readAsDataURL(file);
      }
    };
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        {
          id,
          title,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert("Blog updated successfully!");
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error(error);
      alert("Error updating blog");
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
  };

  return (
    <div>
      <Appbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Change Your Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Change your Content
          </label>
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            className="bg-white rounded-lg shadow-md"
          />
        </div>
        <div className="mb-4">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEditor;
