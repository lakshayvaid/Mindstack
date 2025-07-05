import { LogoutIcon } from "../icons/LogoutIcon"
import { useNavigate } from "react-router-dom";

export function LogoutComponent(){

    const navigate=useNavigate();

function LogoutHandler(){
    localStorage.removeItem("token");
    navigate('/login');

} 



return <div className="flex fixed bottom-10 sm:bottom-5  sm:p-2   left-2 gap-0 hover:cursor-pointer" >
<LogoutIcon/>
   <button onClick={LogoutHandler} className="sm:text-lg text-md pb-0.5 hover:font-semibold hover:cursor-pointer">Logout</button>
</div>
}