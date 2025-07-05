import { DeleteIcon } from "../icons/DeleteIcon"
import { ShareIconCard } from "../icons/ShareIconCard"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { useEffect } from "react"



declare global {
  interface Window {
    twttr: any;
  }
}

interface CardComponentProps{
   tittle:string;
   link:string;
   type:"youtube" | "twitter";
   contentid:string;
   onContentDeleted:()=>void;
}


export function CardComponent({contentid, tittle, link, type,onContentDeleted }:CardComponentProps) {


useEffect(() => {
    if (type === "twitter" && window?.twttr?.widgets) {
      window.twttr.widgets.load();
    }
  }, [contentid,type, link,]);


   return <div className=' bg-white sm:min-w-2xs sm:max-w-3xs  sm:h-94  w-3xs h-70 flex-col    overflow-hidden border-white/70 border-3 border-t-6 rounded-lg shadow-md shadow-gray-800 m-1 sm:mb-5 p-4'>
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
         <div className="flex justify-evenly gap-2 px-1">
            <ShareIconCard />
            <DeleteIcon contentid={contentid} onContentDeleted={onContentDeleted}/>
         </div>

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
