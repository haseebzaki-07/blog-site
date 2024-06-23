import  { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

export interface Blog {
    "content" : string ,
    "title" : string ,
    "id" : string ,
    "author" :{
        "name" : string ,
    }
    "authorId" : string ,
}
export const useBlog = ({id} : {id : string}) => {
    const [loading, setloading] = useState(true);
    const [blog, setblog] = useState<Blog>()

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${ id }`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setblog(response.data.post)
            setloading(false)
        })
     
    }, [])
    useEffect(()=>{
        console.log(blog)
    }, [blog])
    return {
        loading, 
        blog
    }
}   

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}