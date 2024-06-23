
import { useRecoilValue } from "recoil";
import { Blogs } from "../pages/Blogs"
import { userState } from "../store/UserState";
import { useInitializerUser } from "../hooks/Auth";







export const Dashcomp = ()=>{
    useInitializerUser()   
const user = useRecoilValue(userState);

  if (!user) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <div >
    
      <Blogs authorId={user.id} myblogs = {true} />
    </div>
  );
}