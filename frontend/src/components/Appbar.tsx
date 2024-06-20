import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar  =() => {
    return <div className="border-b w-full flex justify-between px-10 py-4">
        <Link to = {"/blogs"}>
        <div className="flex flex-col justify-center">
            Blog Site
        </div>
        </Link>
        
        <div>
            <Avatar size={"big"} name={"haseeb"}/>
        </div>
    </div>
}