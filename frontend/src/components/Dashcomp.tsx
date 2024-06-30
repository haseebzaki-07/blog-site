import { useRecoilValue } from "recoil";
import { Blogs } from "../pages/Blogs";
import { userState } from "../store/UserState";


export const Dashcomp = () => {
  const user = useRecoilValue(userState);

;
  if (!user) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <div className="flex gap-10 w-full">
      <Blogs authorId={user.id} myblogs={true} />
     
    </div>
  );
};
