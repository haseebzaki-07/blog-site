
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/Fullblog";

import { useBlog } from "../hooks";
import {useParams} from "react-router-dom";

// atomFamilies/selectorFamilies
export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    }); 

    if (loading || !blog) {
        return <div>
            <Appbar />
            <h1 className="mt-20">
            Loading...
            </h1>
        </div>
    }
    return <div className="bg-zinc-200">
        <FullBlog blog={blog} />
    </div>
}