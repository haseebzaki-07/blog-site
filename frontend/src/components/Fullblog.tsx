import { useNavigate } from "react-router-dom";
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import DOMpurify from "dompurify";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useEffect, useState } from "react";
import { formattedDate } from "../pages/Blogs";
import { Comment } from "./Comment";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();
  const sanitizedContent = DOMpurify.sanitize(blog.content);

  const [likeCount, setLikeCount] = useState(blog.likeCount);
  const [loading, setLoading] = useState(true);
  const [oncomment, setOncomment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/${blog.id}/comment`
        );
        console.log("Fetched Comments:", response.data.comments); // Debugging log
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [blog.id]);

  useEffect(() => {
    setLikeCount(blog.likeCount);
  }, [blog]);

  const onClickHandler = () => {
    navigate(`/update/${blog.id}`);
  };

  const onLikeHandler = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/blog/${blog.id}/like`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setLikeCount(likeCount + 1);
      alert("Blog liked successfully!");
    } catch (error) {
      alert("Error liking the blog or it has already been liked.");
    }
  };
  const onCommentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOncomment(e.target.value);
  };

  const publishComment = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/blog/${blog.id}/comment`,
        { content: oncomment },

        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert(" commented successfully!");
      setOncomment("");
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/blog/${blog.id}/comment`
      );
      setComments(response.data.comments);
    } catch (error) {
      alert("Error commenting the blog ");
      console.log(error);
    }
  };
  const onDeleteHandler = async () => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/v1/blog/${blog.id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      alert(response.data.msg);
      navigate("/blogs");
    } catch (error) {
      console.error("Error deleting post:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 403) {
            alert("You are not authorized to delete this post.");
          } else {
            alert(
              `Error: ${error.response.data.msg || "Failed to delete post"}`
            );
          }
        } else if (error.request) {
          alert("Error: No response from server. Please try again later.");
        } else {
          alert(`Error: ${error.message}`);
        }
      } else {
        alert(`Error: ${String(error)}`);
      }
    }
  };

  return (
    <div>
      <Appbar />

      <div className="flex justify-center mt-20 w-screen h-screen ">
        <div className="w-full flex justify-center  pt-12">
          <div className="max-w-4xl w-full bg-white p-10 rounded-lg shadow-md">
            <div className="text-5xl font-extrabold overflow-hidden break-words pb-10">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-2">Posted on {formattedDate}</div>
            <div
              className="pt-4 overflow-hidden break-words"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }} // blog.content
            ></div>
          </div>
        </div>
        <div className="col-span-4 mt-20">
          <div className="text-slate-600 text-lg">Author</div>
          <div className="flex w-full">
            <div className="pr-4 flex flex-col justify-center">
              <Avatar size="big" name={blog.author.name || "Anonymous"} />
            </div>
            <div>
              <div className="text-xl font-bold">
                {blog.author.name || "Anonymous"}
              </div>
              <div className="pt-2 pr-10 text-slate-500">
                Random catch phrase about the author's ability to grab user's
                attention
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-4 ">
            <button
              onClick={onClickHandler}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
            <button
              onClick={onDeleteHandler}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete Blog
            </button>
            <button
              onClick={onLikeHandler}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Like ({likeCount})
            </button>
          </div>
          <div className="mt-10">
            <h3 className="mb-2">Enter your comment</h3>
            <div className="h-[5vh] w-[25vw] ">
              <input
                onChange={onCommentHandler}
                type="text"
                value={oncomment}
                className="w-full h-full px-2 "
              />
            </div>
            <button
              onClick={publishComment}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Comment
            </button>
            <div className="w-[25vw]  mt-10">
              <Comment comments={comments} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
