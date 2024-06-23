import { jwtDecode } from "jwt-decode";


interface DecodedToken {
    name : string
    id : string
    email : string
}
export const getUser = ()=>{
    const token = localStorage.getItem("token")
    if(!token) return null;
    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken;
      } catch (error) {
        console.error('Invalid token');
        return null;
      }
}

