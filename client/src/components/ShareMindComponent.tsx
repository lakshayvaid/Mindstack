import { useCallback,useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { AlertComponent } from "./AlertComponent";

export function ShareMindComponent(){
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [Alert,setAlert]=useState(false)
  const[alertText,setAlertText]=useState("");
  const[generateButtonDisabled,setGenerateButtonDisabled]=useState(false);
  const[deleteButtonDisabled,setDeleteButtonDisabled]=useState(true);


const [sharableLink,setSharableLink]=useState("");

  const getSharableLink = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backend}/api/v1/mindstack/share`,
        {},
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
        
      setAlert(true);
      setAlertText("Link Generated")

      const receivedLink =await  response.data;
       setSharableLink(receivedLink);

       
     
    } catch (err) {
      console.log(err);
    }
  },[]);



function generateLinkButtonHandler(){
getSharableLink();
setGenerateButtonDisabled(true);
setDeleteButtonDisabled(false);
}

const Navigate=useNavigate();

 async function sharableLinkDeleteButtonHandler(){
  try{ const token=localStorage.getItem("token");

   const response =await axios.delete(`${backend}/api/v1/mindstack/share`,
    
    {
        headers:{
        authorization:`bearer ${token}`,
    }
}
   )
   console.log(await response.data);
   setSharableLink("");

   setAlert(true);
   setAlertText("Link Deleted")
   setGenerateButtonDisabled(false);
   setDeleteButtonDisabled(true);
  
  }
  catch(err){
    console.log(`this is ${err}`);
  }

 }

    return<>
    
     <div className="flex justify-center  opacity-100  w-screen h-screen p-0 margin-0 bg-gray-100 overflow-hidden " >
        <div className=" fixed top-5 left-5 text-3xl font-semibold"> Sharable Link</div>
     
        <div className="border shadow-xl border-white/50 shadow-gray-700 mt-30  flex gap-5 rounded-2xl bg-white flex-col  text-md sm:text-2xl w-5xl h-80">

        <div className="mt-2 p-2 pl-4">This is your Mindstack sharable link, anyone can access your mindstack using this link until you delete it. </div>

        <div className="flex gap-6 flex-col  justify-center items-center"> 
           <div className="border  border-blue-500 p-3 rounded-md select-all"> {` http://localhost:5173/mindstack/share/${sharableLink}`}</div>
           <div className="flex gap-6 items-center flex-wrap">
            <div><button disabled={generateButtonDisabled} onClick={generateLinkButtonHandler} className={`${generateButtonDisabled?'bg-gray-400 text-gray-200':'bg-blue-600 text-white'} p-2 rounded-md border`}> Generate link</button> </div>
            <div><button disabled={deleteButtonDisabled} onClick={sharableLinkDeleteButtonHandler} className={`${deleteButtonDisabled?'bg-gray-400 text-gray-200  ':'bg-blue-600 text-white '}border-2 rounded-md p-2 `}>Delete</button> </div> </div>   </div>
       
        <div className="flex w-full flex-wrap justify-end pr-5">
          <button onClick={()=>Navigate('/dashboard')} className="border-2 bg-green-300 border-green-400 p-1 rounded-xl text-md text-green-700 text-bold hover:bg-green-500 hover:cursor-pointer hover:border-green-900 hover:text-gray-700">&lt;Go back</button>
        </div>


        </div>

        {Alert && <AlertComponent option={true} text={alertText}/>}
    </div>

 
       
        
    

    </>
}