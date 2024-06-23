import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";


interface Appbarprops {
  explore? : boolean;
  signup? : boolean;
 
}

export const Appbar  = ({explore , signup  } :Appbarprops  ) => {
  const navigate = useNavigate()
  return (
    <div className="border-b w-full flex justify-between px-14 py-4 bg-zinc-300">
   <Link to={"/"}>
     <div className="flex flex-col justify-center text-3xl font-semibold">
       InkWell
     </div>
   </Link>

   <div className="flex items-center justify-between ">
    {explore &&
     <button  onClick= {()=> navigate("/blogs")} type="button"
       className="text-gray-700 hover:text-black  hover:underline font-medium text-sm px-5  text-center me-2 mb-2">Explore</button> }
    { signup ? <button onClick={()=>{navigate("/signin")}}  
       type="button"
       className="text-gray-700 hover:text-black  hover:underline font-medium text-sm px-5  text-center me-2 mb-2"
     >
       Log in
     </button> : 
     <button onClick={()=>{navigate("/signup")}}  
       type="button"
       className="text-gray-700 hover:text-black  hover:underline font-medium text-sm px-5  text-center me-2 mb-2"
     >
      Sign up
     </button>}
     <Avatar size={"big"} name={"I"} />
   </div>
 </div>
  );
};
