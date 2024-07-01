import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useRecoilValue } from "recoil";
import { userState } from "../store/UserState";
import { useScrollDirection } from "../hooks";
import "../App.css";

interface Appbarprops {
  explore?: boolean;
  signup?: boolean;
}

export const Appbar = ({ signup }: Appbarprops) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const scrollDirection = useScrollDirection();
  return (
    <div
      className={`w-full fixed top-0 left-0 right-0 transition-transform duration-300 shadow-md h-20 flex justify-between  items-center px-14 py-4 bg-slate-300 *: ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Link to={"/"}>
        <div className="flex flex-col justify-center text-3xl font-semibold">
          InkWell
        </div>
      </Link>
      <div className="flex  items-center gap-4 ">
        <Link to={"/"}> Home</Link>
        {user ? null : (
          <div className="">
            {signup ? (
              <button
                onClick={() => {
                  navigate("/signin");
                }}
                type="button"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Log in
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/signup");
                }}
                type="button"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Sign up
              </button>
            )}
          </div>
        )}
        <div className="flex items-center">
          <Avatar size="big" name="I" />
        </div>
      </div>
    </div>
  );
};
