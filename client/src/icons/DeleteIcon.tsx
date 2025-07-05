import axios from "axios"
import { AlertComponent } from "../components/AlertComponent";
import { useState } from "react";


interface deleteProps{
  contentid:string;
  onContentDeleted:()=>void;
}


export function DeleteIcon({contentid,onContentDeleted}:deleteProps){

  const [Alert,setAlert]=useState(false)
    const[alertText,setAlertText]=useState("");
 
 async function handleCardDeleteButton(){
     
  try{
    const token=localStorage.getItem("token");
   const response= await axios.delete('http://localhost:3000/api/v1/content/',{
      headers:{
        authorization:`bearer ${token}`,
        contentid
      }
    })
   
  
    setTimeout(()=>{
   onContentDeleted();
  
    },500)
     
   setAlert(true);
    setAlertText("Content Deleted");
    console.log(await response.data);
  
  
  }
  catch(err){
    console.log(err);
    alert(err);
  }
 }




    return <div onClick={handleCardDeleteButton}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-gray-500 hover:text-gray-900 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

{Alert && <AlertComponent option={true} text={alertText}/>}
</div>
}