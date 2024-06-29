import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
  authorId: string;
  likeCount  : number;
  publishedDate : string;

  
}
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setloading] = useState(true);
  const [blog, setblog] = useState<Blog>();
 

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data.post;
        const blog: Blog = {
          ...data,
          likeCount: data._count?.likes || 0,
        };
        setblog(blog);
        setloading(false);
      });
  }, [id]);
  useEffect(() => {
    console.log(blog);
  }, [blog]);
  return {
    loading,
    blog,
  };
};
// export const useComments = (id : string) => {
//   const [loading, setLoading] = useState(true);
//   const [comments , setComments] = useState<Comment[]>([]);
//   useEffect(()=>{
//     const fetchComments =async ()=>{
//         await axios.get(`${BACKEND_URL}/api/v1/${id}/comment`).then(response => {
//           console.log("Fetched Comments:", response.data.comments); // Debugging log
//           setComments(response.data.comments),
//           setLoading(false)
//         })
//     }
//     fetchComments()
//     setLoading(false)
//   } , [id])
//   return {
//     loading,
//     comments,
//   }
// }


export const useBlogs = (page = 1, limit = 10) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          params: { page, limit },
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setBlogs(response.data.blogs);
        setTotal(response.data.total);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };

    fetchBlogs();
  }, [page , limit]);

  return {
    loading,
    blogs,
    total,
  };
};

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return scrollDirection;
};
