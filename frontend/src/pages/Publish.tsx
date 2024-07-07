import {  useRecoilValue } from "recoil"
import Editor from "../components/Editor/Editor"
import { userState } from "../store/UserState"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


export const Publish  =() => {

   const user = useRecoilValue(userState)
   const navigate = useNavigate()

  useEffect(()=>{
   if(!user) {
      alert("you have to sign in first")
      navigate("/signup")
   }
  })

  if(!user){
   return null;
  }
return <div className="bg-slate-100 min-h-screen">
   <Editor/>
</div>
}