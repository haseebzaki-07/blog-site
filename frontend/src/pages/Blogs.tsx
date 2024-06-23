
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = ({authorId , myblogs} : {authorId? : string , myblogs : boolean}) => {
  const { loading, blogs } = useBlogs();

  
  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredBlogs = authorId ? blogs.filter(blog => blog.authorId === authorId) : blogs


  return (
    <div>
      <Appbar explore={true} />
      <h1 className="text-3xl p-6"> 
        {myblogs ? "My Blogs" :" All Blogs"}
      </h1>
     { filteredBlogs.map((blog) => (
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
    </div>
  );
};
