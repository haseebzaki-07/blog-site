import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { userState } from "../store/UserState";
import { getUser } from "../utils/AuthStore";
import { useNavigate } from "react-router-dom";

export const useInitializerUser = () => {
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