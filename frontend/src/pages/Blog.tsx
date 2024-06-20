
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
            Loading...
        </div>
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}