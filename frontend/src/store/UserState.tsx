import { atom } from "recoil";
interface User {
  name: string;
  id: string;
  email : string;
}

export const userState= atom<User | null>({
  key: "userState",
  default: null,
});
