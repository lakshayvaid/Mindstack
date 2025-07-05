import { TickIcon } from "../icons/TickIcon"
import { AlertCrossIcon } from "../icons/AlertCrossIcon"
import { useState,useEffect } from "react";


interface alertProps{
    option:boolean,
    text:string,

}


export function AlertComponent({option,text}:alertProps){
const [slideIn ,setslidein]=useState(false)

useEffect(()=>{
    setslidein(true);
    setTimeout(()=>{
setslidein(false)
    },1200)
},[])





    return  <div className={`border-3 ${option===true?'border-green-500':'border-red-500'}  rounded-md  flex gap-2 shadow-green-300 fixed bottom-1 right-10 w-xs h-15 bg-white p-4 transition-transform duration-1000 transform  items-center text-lg  ${
          slideIn? 'translate-x-0' : 'translate-x-[100vw]'}
        `} >
       <div >{option===true? <TickIcon/>:<AlertCrossIcon/> }</div> <div> {text}</div>
          

    </div>

    
}
