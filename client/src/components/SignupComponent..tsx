import { SignupIcon } from "../icons/SignupIcon"
import { useRef,useEffect,useState } from "react"
import axios from "axios";
import {Link ,useNavigate} from 'react-router-dom'
import { AlertComponent } from "./AlertComponent";

export function SignupComponent() {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [Alert,setAlert]=useState(false)
  const[alertText,setAlertText]=useState("");


const navigate=useNavigate();
     const usernameRef=useRef<HTMLInputElement>(null);
     const emailRef=useRef<HTMLInputElement>(null);
     const passwordRef=useRef<HTMLInputElement>(null);


  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token){
        navigate('/dashboard');
    }
  },[])


    async function handleSignupButton(){
        try{
        const username=usernameRef.current?.value;
        const email=emailRef.current?.value;
        const password=passwordRef.current?.value;

        const response= await axios.post(`${backend}/api/v1/signup`,{
            username,
            email,
            password,
        })
        console.log(await response.data);
    
        setAlert(true);
        setAlertText("signed up");
   setTimeout(()=>{
 navigate("/login");
   },2500)
     
    
               
    }
    catch(err){
        console.log(err);
        
        setAlert(true);
        setAlertText("Invalid Inputs or Email Already Exists !")
    setTimeout(() => setAlert(false), 2000);
    navigate('/signup');
     
    }
    }


    return <div className="fixed top-0 left-0 min-w-screen opacity-95 min-h-screen bg-white flex justify-center items-center   bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVycGxlJTIwZ3JhZGllbnRzfGVufDB8fDB8fHww')] bg-cover bg-center h-screen w-full "  >

        <div className="fixed top-1 right-4 text-white font-semibold">Mindstack</div>

        {/* heading */}
        <div className="fixed  top-8 left-5 text-5xl text-white w-lg h-25 font-bold flex justify-start items-center gap-1 p-1">
            <SignupIcon />
            <div className="flex w-sm h-20 justify-start pb-1 pl-1 items-center text-3xl sm:text-5xl  ">Let's, Signup!</div></div>


      {/* signup div */}
        <div className=" rounded-xl bg-white border-2  border-purple-800 h-107  shadow-xl/70 shadow-gray-900 w-xs  flex flex-col gap-5 pt-15 pb-10 px-4 ">


<div className= "flex flex-col gap-1">
              
                <input  ref={usernameRef}     className="border outline-none rounded-md p-2 pl-3 focus:border-pink-600 focus:border-2 " type="text" placeholder="Username" spellCheck={false} autoFocus />
<div className="justify-center items-center  max-w-full text-xs text-red-700"> Minimum length should be 4 characters.</div>
</div>
         
            <div className="flex flex-col gap-1">
                 <input   ref={emailRef}     className="border outline-none rounded-md p-2 pl-3 focus:border-pink-600 focus:border-2" type="text" placeholder="E-mail" spellCheck={false} />
                 <div className="justify-center items-center  max-w-full text-xs text-red-700">Email must contain '@' and '.' </div>
            </div>

           
            <div className="flex flex-col gap-1">
            <input   ref={passwordRef}   className="border-1 outline-none pl-3 w-full focus:border-pink-600 focus:border-2 rounded-md p-2" type="password" placeholder="password" spellCheck={false} />
               <div className="justify-center items-center  max-w-full text-xs text-red-700"> Must contain min length 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 speacial character </div>
</div>
            <div className="flex justify-center mt-3 ">
                <button  onClick={handleSignupButton} className=" text-white bg-pink-500 text-lg  border-1 border-pink-700 font-semibold hover:cursor-pointer hover:bg-pink-600 rounded-md w-30 h-11">
                    Continue &gt;</button>
            </div>

            <div className=" flex gap-1 justify-start items-center text-sm font-medium text-gray-600 ">
                Already have an account?  <Link to="/login" className="underline text-purple-900 hover:text-purple-950"> Login </Link>
            </div>


        </div>


{Alert&& <AlertComponent option={alertText==="signed up"} text={alertText}/>

}
  
    </div>
}