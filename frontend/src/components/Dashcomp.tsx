import { useRecoilValue } from "recoil";
import { Blogs } from "../pages/Blogs";
import { userState } from "../store/UserState";

export const Dashcomp = () => {
  const user = useRecoilValue(userState);

  if (!user) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <div className="flex gap-10 w-full">
      <Blogs authorId={user.id} myblogs={true} />
      <div className="w-[20vw] mt-28">
        <div className="w-full h-[40vh] bg-red-200 mb-10">My likes</div>
        <div className="w-full h-[40vh] bg-green-200">My comments</div>
      </div>
    </div>
  );
};
