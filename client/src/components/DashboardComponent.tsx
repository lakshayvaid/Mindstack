
import { useState,useEffect,useCallback } from 'react';

import { CardComponent } from '../components/CardComponent'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import axios from 'axios';
import { CreateContentModal } from '../components/CreateContentModal'
import { SidebarComponent } from '../components/SidebarComponent';

import { useNavigate } from 'react-router-dom';

interface ButtontextProps{
  text:string;
}

interface ContentProps{
  tittle:string;
  link:string;
  type:"youtube" | "twitter";
  _id:string;
}

function Buttontext({ text }:ButtontextProps) {
  return <div className='sm:pl-1  sm:pr-1 sm:text-lg text-xs'>{text}</div>

}


export function DashboardComponent() {
const backend = import.meta.env.VITE_BACKEND_URL;

  const [open, setOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [content,setContent]=useState<ContentProps[]>([]);

  function onClose() {
    setOpen(false);

  }

  const Navigate=useNavigate()
  function shareMindButtonHandler(){
    Navigate('/ShareMind');
  }


      const fetchData= useCallback (async()=>{
        
   
          try{
           const token=localStorage.getItem("token")
        
         const response= await axios.get(`${backend}/api/v1/dashboard`,{
            headers:{
              authorization:`bearer ${token}`
            }

          })
        setContent(response.data.content)
        if(content.length===0){
          return ;
        }
        
        }
          catch(err){
            console.log(err);
            alert("unable to get content");
          }
    
        
    },[]);

    const token=localStorage.getItem("token")
    useEffect(()=>{
     
      fetchData();
    },[fetchData,refreshTrigger,token])

     

  return <div className='flex w-screen h-screen p-0 margin-0 overflow-hidden '>
    <CreateContentModal open={open} onClose={onClose} onContentAdded={()=>setRefreshTrigger(prev=>prev+1)} />

    {/* Sidebar */}

    <SidebarComponent/>

    {/* Main div */}
        <div className='  bg-gray-100  px-1 flex-col sm:min-h-screen sm:w-full   overflow-x-hidden '>

    {/* <div className='sm:w-400 h-screen bg-gray-100  px-1 flex-col min-h-screen w-full  overflow-x-hidden '> */}



      {/* Heading Div */}
      <div className=' m-1 mt-2 px-3  py-4 flex flex-wrap  bg-transparent rounded-xl sm:justify-between items-center sm:w-full   sm:h-30  h-20'>

        {/* Heading */}
        <div className='text-gray-900 font-sans  px-1 sm:mx-2 flex justify-center items-center  sm:text-4xl text-xl sm:tracking-wide sm:font-bold'>Contents</div>
        {/* Button div */}
        <div className='flex sm:gap-4 gap-1 items-center '>

          <button onClick={shareMindButtonHandler}
            className='flex items-center  bg-blue-500 sm:w-36 sm:h-11 w-21 h-8  cursor-pointer hover:bg-blue-600 rounded-md text-white  py-3' >
            <ShareIcon />
            <Buttontext text="Share Mind" />
          </button>

          <button onClick={() => { setOpen(true) }} className='flex items-center  bg-purple-600 sm:w-36 sm:h-11  w-22 h-8 cursor-pointer hover:bg-purple-700 rounded-md text-white sm:py-3 py-1' >
            <PlusIcon />
            <Buttontext text="Add Content" />
          </button>
        </div>
      </div>

      {/* Content div */}
      
 <div className=' sm:my-5   sm:w-full sm:min-h-screen min-h-screen w-full bg-gray-100 flex  py-10  px-5 rounded-3xl  border-3 border-white/20 shadow-xl shadow-gray-600 flex-wrap gap-2 mx-1 overflow-x-hidden '>


{content.length===0?  <div className='  text-3xl text-gray-500 tracking-wide font-semibold w-full  flex justify-center items-center'> No Content </div>:

  content.map((c)=>{
   return  <CardComponent key={c._id} contentid={c._id} tittle={c.tittle} type={c.type} link={c.link} onContentDeleted={()=>setRefreshTrigger(prev=>prev+1)}  /> 
})
}
    



      </div>
    </div>



  </div>
}
