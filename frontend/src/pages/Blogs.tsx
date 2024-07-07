import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../store/UserState";
import BlogCardLoader from "../components/BlogCardLoader";


export const Blogs = ({
  authorId,
  myblogs,
}: {
  authorId?: string;
  myblogs?: boolean;
}) => {
  const [page, setPage] = useState(1);
  const { loading, blogs, total } = useBlogs(page, 10);
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const onclickAdd = () => {
    if (!user) {
      alert("You need to sign in first");
      navigate("/signup");
    } else {
      navigate("/publish");
    }
  };

 if (loading) {
    return (
      <div>
        <Appbar />
        <div className="mt-20">
        <BlogCardLoader/>
        <BlogCardLoader/>
        <BlogCardLoader/>
        </div>
      </div>
    );
  }

  const filteredBlogs = authorId
    ? blogs.filter((blog) => blog.authorId === authorId)
    : blogs;

  const totalPages = Math.ceil(total / 10);

  return (
    <div>
      <Appbar explore={true} />
      <h1 className="text-3xl p-6 mt-20 italic ml-[20vw]">
        {myblogs ? "My Blogs" : "All Blogs "}
      </h1>
      {filteredBlogs.map((blog) => {
         let formattedDate = "2024-06-07";

         if (blog.publishedDate) {
         
           
           const date = new Date(blog.publishedDate);
           if (!isNaN(date.getTime())) {
            
             formattedDate = blog.publishedDate.split(" ")[0];
           }
         }
        return (
          <BlogCard
            key={blog.id}
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={formattedDate}
            authorId={blog.authorId}
            myblogs={myblogs}
          />
        )
      })}
      <div className="flex justify-center m-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="  font-bold py-2 px-4 rounded mr-2"
        >
          <IoIosArrowBack className="text-2xl" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            disabled={page === index + 1}
            className={`${
              page === index + 1
                ? "bg-gray-500"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded mr-2`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="font-bold py-2 px-4 rounded"
        >
          <IoIosArrowForward className="text-2xl" />
        </button>
      </div>
      {myblogs ? null : <div className=" sticky   bottom-5  ">
        <button
          onClick={onclickAdd}
          type="button"
          className=" bg-red-300 flex gap-2 items-center text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <h2>Add New Blog</h2>
          <span>
            <FaPlus />
          </span>
        </button>
      </div>}
    </div>
  );
};
