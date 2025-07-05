import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"

import  axios  from "axios"




import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"



declare global {
  interface Window {
    twttr: any;
  }
}

interface CardComponentProps{
   tittle:string;
   link:string;
   type:"youtube" | "twitter";
  

}


 function SharableCardComponent({ tittle, link, type }:CardComponentProps) {


useEffect(() => {
    if (type === "twitter" && window?.twttr?.widgets) {
      window.twttr.widgets.load();
    }
  }, [type, link]);


   return <div className=' bg-white min-w-3xs max-w-2xs  h-94  flex-col    overflow-hidden border-white/70 border-3 border-t-6 rounded-lg shadow-md shadow-gray-800 m-1 mb-5 p-4'>
      <div className=' flex py-2 border-2 rounded  border-white/20 shadow-lg  m-1 justify-between w-full max-w-full overflow-hidden  '>
         <div>
            {
               type == "youtube" &&
               <div className="w-7 flex justify-center items-center h-7  mx-0.5">
                  <YoutubeIcon />
               </div>
            }
            {
               type == "twitter" && <TwitterIcon />
            }
         </div>
         <div className="text-xl   text-gray-600 flex px-1  flex-wrap items-center justify-center  mx-1 max-w-sm  max-h-16 overflow-hidden ">
           {tittle}
         </div >


      </div>
      {type == "youtube" && <div className=" px-5 max-w-full  h-58 shadow-xl rounded-lg flex flex-wrap  items-center justify-center">
         <iframe src={link} className=" max-w-60  rounded-md"
            title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; 
      encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>}

      {
         type == "twitter" && <div className='cursor-pointer flex flex-wrap max-w-full justify-center max-h-full  overflow-hidden overflow-y-scroll px-3 '>

            <blockquote className="twitter-tweet"><a href={link}></a></blockquote>

          
         </div> 
                                             
      }

   </div>
}









export function SharableContent(){
    const [recievedContent,setRecievedContent]=useState<CardComponentProps[]>([]);

    const{shareid}=useParams<{shareid:string}>();

    useEffect(()=>{
       async function getContent(){
        try{ 
            const response=await axios.get(`http://localhost:3000/api/v1/mindstack/share/${shareid}`);
            setRecievedContent(await response.data.content);
        }
        catch(err){
    alert(err);
           }
    }
getContent();
    },[])


return <div className='flex min-w-full min-h-screen p-0 margin-0 overflow-hidden'>

<div className='    w-full min-h-screen bg-gray-100 flex  py-20  px-5 rounded-3xl  border-3 border-white/20 shadow-xl shadow-gray-600 flex-wrap gap-2 mx-1 my-5 '>


{recievedContent.length===0?  <div className='  text-3xl text-gray-500 tracking-wide font-semibold w-full  flex justify-center items-center'> No Content </div>:

  recievedContent.map((c)=>{
   return <SharableCardComponent  tittle={c.tittle} type={c.type} link={c.link}  /> 
})
}
    



      </div>

</div>

}