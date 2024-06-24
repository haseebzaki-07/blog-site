import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { userState } from "../store/UserState";
import { getUser } from "../utils/AuthStore";
import { useNavigate } from "react-router-dom";

export const useInitializerUser = () => { //calls geUser that decodes the jwt and userInitializer sets the decoded object into the state
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    const user = getUser();
    if (user) setUser(user);
  }, [setUser]);
};


export const useSignout = () =>{
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState);

   const signout = ()=> {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin")
   }

   return signout

}