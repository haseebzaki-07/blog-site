import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack} from "react-icons/io";

export const Blogs = ({
  authorId,
  myblogs,
}: {
  authorId?: string;
  myblogs?: boolean;
}) => {
  const [page, setPage] = useState(1);
  const { loading, blogs, total } = useBlogs(page, 10);

  if (loading) {
    
    return <div>
      <Appbar/>
      <h1 className="mt-20">Loading...</h1>
    </div>;
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
      {filteredBlogs.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          authorName={blog.author.name || "Anonymous"}
          title={blog.title}
          content={blog.content}
          publishedDate={"2nd Feb 2024"}
          authorId={blog.authorId}
        />
      ))}
      <div className="flex justify-center m-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="  font-bold py-2 px-4 rounded mr-2"
        >
          <IoIosArrowBack className="text-2xl"/>
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
          <IoIosArrowForward className="text-2xl"/>
        </button>
      </div>

    </div>
  );
};
