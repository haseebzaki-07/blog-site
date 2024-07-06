import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { DropMenu } from "./DropMenu";
import { Menu, MenuButton } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { getUser } from "../utils/AuthStore";
import { Spinner } from "./Spinner";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  authorId: string;
  myblogs?: boolean;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
  myblogs,
}: BlogCardProps) => {
  const sanitizedContent = DOMPurify.sanitize(content.slice(0, 100) + "...");
  return (
    <Link
      to={`/blog/${id}`}
      className={`flex  ${
        myblogs ? "mx-[10vw] w-[55vw]" : "mx-[20vw] w-[60vw]"
      }`}
    >
      <div className="p-4 border-b border-slate-200  pb-4 w-full cursor-pointer shrink-0">
        <div className="flex">
          <Avatar name={authorName} />
          <div className="font-extralight pl-2 lg:text-sm text-lg flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2 ">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className=" lg:text-2xl text-3xl font-semibold pt-2">{title}</div>
        <div
          className="lg:text-sm text-2xl font-thin "
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        ></div>
        <div className="text-slate-500 lg:text-sm  text-md font-thin pt-4">
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  const [username, setUsername] = useState("");
  const [loading, setloding] = useState(false);
  useEffect(() => {
    const user = getUser();
    if (!user) {
      setUsername("Anonymous");
      return;
    }
    const id = user.id;
    const getAvatarUser = async () => {
      await axios
        .get(`${BACKEND_URL}/api/v1/user/${id}`)
        .then((response) => setUsername(response.data.name));
    };

    getAvatarUser();
    setloding(false);
  });
  if (loading) {
    return (
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          <Spinner/>
        </span>
      </div>
    );
  }

  return (
    <Menu>
      <MenuButton
        className={`relative flex items-center justify-center hover: cursor-pointer overflow-hidden bg-gray-600 rounded-full ${
          size === "small" ? "w-6 h-6" : "w-10 h-10"
        }`}
      >
        <span
          className={`${
            size === "small" ? "text-xs" : "text-md"
          } font-extralight text-gray-600 dark:text-gray-300`}
        >
          {size === "small" ? name[0] : username[0]}
        </span>
      </MenuButton>
      <DropMenu />
    </Menu>
  );
}
