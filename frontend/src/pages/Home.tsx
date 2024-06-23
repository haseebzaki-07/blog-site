import { Appbar } from "../components/Appbar"

export const Home = ()=>{
    return <div className="w-full h-screen bg-zinc-200">
        <Appbar explore = {true}/>
        <div className="flex justify-center items-center h-[80vh] ">
         
              <h1 className="text-9xl w-30[vw]">Welcome to InkWell </h1>
              <p className="w-[70vw]">"Where every word you pen down becomes a part of the world's story. Share your thoughts, ignite conversations, and inspire minds. Dive into the endless sea of creativity and let your ink flow freely."</p>
     
         
        </div>
    </div>
}