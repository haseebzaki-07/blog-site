import { useRecoilValue } from "recoil";
import UpdateEditor from "../components/Editor/UpdateEditor";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/UserState";
import { useEffect } from "react";

export const Update = () => {
  const user = useRecoilValue(userState
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("you have to sign in first");
      navigate("/signup");
    }
  });

  if (!user) {
    return null;
  }

  return (
    <div>
      <UpdateEditor />
    </div>
  );
};
