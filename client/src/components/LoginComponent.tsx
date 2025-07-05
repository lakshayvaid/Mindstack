
import { useRef,useState} from "react"
import axios from "axios";
import {Link ,useNavigate} from 'react-router-dom'

import { MindstackLogoComponent } from "./MindstackLogoComponent";
import { LoginMessageComponent } from "./LoginMessageComponent";

import { AlertComponent } from "./AlertComponent";


export function LoginComponent() {
const [Alert,setAlert]=useState(false)
  const[alertText,setAlertText]=useState("");
 const Navigate=useNavigate();

     const loginEmailRef=useRef<HTMLInputElement>(null);
     const loginPasswordRef=useRef<HTMLInputElement>(null);

    async function handleLoginButton(){

        try{
        const email=loginEmailRef.current?.value;
        const password=loginPasswordRef.current?.value;

        const response= await axios.post('http://localhost:3000/api/v1/signin',{

            email,
            password,
        })
        
        const token=await response.data.token;
        localStorage.setItem("token",token);

         
       setAlert(true);
       setAlertText("Logged in")
          

   setTimeout(()=>{
    Navigate('/dashboard');
   },2000)
 

               
               
    }
    catch(err){
        console.log(err);
        setAlert(true);
        setAlertText("Not Logged in")
        setTimeout(()=>{
     Navigate('/login');
        },1500)
   
  
    }
    }


    return <div className="fixed top-0 left-0 min-w-screen opacity-95 min-h-screen bg-white flex justify-center items-center   bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVycGxlJTIwZ3JhZGllbnRzfGVufDB8fDB8fHww')] bg-cover bg-center h-screen w-full "  >

       <MindstackLogoComponent/>

        {/* heading */}
     <LoginMessageComponent/>


      {/* Login div */}
        <div className=" rounded-xl bg-white border-2  border-purple-800 h-86  shadow-xl/70 shadow-gray-900 w-xs  flex flex-col gap-7 pt-20 pb-10 px-4 ">

          
            <input   ref={loginEmailRef}    className="border outline-none rounded-md p-2 pl-3 focus:border-pink-600 focus:border-2" type="text" placeholder="E-mail" spellCheck={false} autoFocus />
            <input   ref={loginPasswordRef}   className="border-1 outline-none pl-3 focus:border-pink-600 focus:border-2 rounded-md p-2" type="password" placeholder="password" />

            <div className="flex justify-center mt-3 ">
                <button  onClick={handleLoginButton} className=" text-white bg-pink-500 text-lg  border-1 border-pink-700 font-semibold hover:cursor-pointer hover:bg-pink-600 rounded-md w-30 h-10">
                    Login</button>
            </div>

            
<div className=" px-3 flex gap-2  justify-center items-center text-sm font-medium text-gray-600 ">
                Don't have an account?  <Link to="/signup" className="underline text-purple-900 hover:text-purple-950"> Signup </Link>
            </div>

        </div>

{Alert && <AlertComponent option={alertText==="Logged in"} text={alertText}/>}

    </div>
}