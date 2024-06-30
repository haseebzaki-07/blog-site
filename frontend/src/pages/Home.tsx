import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { FaPlus } from "react-icons/fa6";

import { useRecoilValue } from "recoil";
import { userState } from "../store/UserState";

export const Home = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const onclickAdd = () => {
    if (!user) {
      alert("You need to sign in first");
      navigate("/signup");
    } else {
      navigate("/publish");
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-100 overflow-hidden">
      <Appbar explore={true} />
      <div className="grid grid-cols-1 md:grid-cols-2 items-center h-[80vh] w-full p-6 gap-6 mt-20">
        <div className="flex justify-center items-center p-4 ">
          <h1 className="text-8xl  font-semibold text-black text-center">
            Welcome to InkWell
          </h1>
        </div>
        <div className=" flex justify-center items-center p-10">
          <p className="  font-medium text-center max-w-prose italic">
            "Where every word you pen down becomes a part of the world's story.
            Share your thoughts, ignite conversations, and inspire minds. Dive
            into the endless sea of creativity and let your ink flow freely."
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/blogs")}
          type="button"
          className="text-gray-900 bg-gradient-to-r from-teal-300 to-lime-300 hover:bg-gradient-to-l hover:from-teal-400 hover:to-lime-400 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Explore
        </button>
        <button
          onClick={onclickAdd}
          type="button"
          className=" flex gap-2 items-center text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          <h2>Add</h2>
          <span>
            <FaPlus />
          </span>
        </button>
      </div>
    </div>
  );
};
