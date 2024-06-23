import { useNavigate } from "react-router-dom";
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import DOMpurify from "dompurify";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();
  const sanitizedContent = DOMpurify.sanitize(blog.content);
  const onClickHandler = () => {
    navigate(`/update/${blog.id}`);
  };
  const onDeleteHandler = async () => {
    await axios.delete(
      `${BACKEND_URL}/api/v1/blog/${blog.id}`,

      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    alert("Blog deleted successfully!")
    navigate("/blogs");
  };
  return (
    <div>
      <Appbar />

      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Post on 2nd December 2023</div>
            <div
              className="pt-4"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            ></div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};
