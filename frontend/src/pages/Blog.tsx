
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/Fullblog";
import { Spinner } from "../components/Spinner";

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
           <Spinner />
        </div>
    }
    return <div className="bg-zinc-200">
        <FullBlog blog={blog} />
    </div>
}