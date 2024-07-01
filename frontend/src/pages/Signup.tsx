import { Appbar } from "../components/Appbar";
import {Auth} from "../components/Auth";
import Quote from "../components/Quote";

const Signup = () => {
  return (
    <div>
      <Appbar  signup={true}/>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth  type = "signup"/>
        </div>
        <div className=" lg:block ">
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default Signup;
