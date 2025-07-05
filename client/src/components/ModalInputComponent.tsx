
import{ useRef,useState} from 'react';
import axios from 'axios';
import { AlertComponent } from './AlertComponent';

interface modalinputprops{
    onClose:()=>void;
    onContentAdded:()=>void;
}

export function ModalInputComponent({onClose,onContentAdded}:modalinputprops) {
    const backend = import.meta.env.VITE_BACKEND_URL;
     const [isButtonDisabled,setButtonDisabled]=useState(false);

const [Alert,setAlert]=useState(false)
  const[alertText,setAlertText]=useState("");


    const [type, setType] = useState("youtube")
    const [TittleValue, setTittleValue] = useState('');
    const [LinkValue, setLinkValue] = useState('');

    const modalTittleRef = useRef<HTMLInputElement>(null);
    const modalLinkRef = useRef<HTMLInputElement>(null);






    const handleTittleFocus = () => {
        // Move cursor to the end on focus
        setTimeout(() => {
            const input = modalTittleRef.current;

            if (input) {
                const len = input.value.length;
                input.setSelectionRange(len, len);
                input.scrollLeft = input.scrollWidth;
            }



        }, 0); // ensure it runs after focus event
    };


    const handleLinkFocus = () => {
        // Move cursor to the end on focus
        setTimeout(() => {

            const link = modalLinkRef.current;


            if (link) {
                const len = link.value.length;
                link.setSelectionRange(len, len);
                link.scrollLeft = link.scrollWidth;
            }

        }, 0); // ensure it runs after focus event
    };


//  const rawlink=LinkRef.current?.value;
// const linkk=rawlink?.split("?")[0];
// const link=linkk?.replace("https://youtu.be/","https://www.youtube.com/embed/");
// console.log(link);

 



    async function AddButtonHandler() {
       

        setButtonDisabled(true);

        try{
        const tittle=modalTittleRef.current?.value
        const link=modalLinkRef.current?.value
        const typevalue=type;
        const token=localStorage.getItem("token");
        

     const response= await   axios.post(`${backend}/api/v1/content`, {
            tittle,
            link,
            type:typevalue
        },
            {
                headers: {
                    authorization:`bearer ${token}`,

                }
            })
           
            setAlert(true);
            setAlertText("Content Added");
            
            setTimeout(()=>{
                   onClose();
          onContentAdded();
       
            },1300)
            
          
         
            console.log(await response.data)
             


        }
        catch(err){
            console.log(err);
        
            alert("not able to add content, try again!")
        }
    }


    
    return <div className=" sm:w-full   flex items-center justify-center flex-col gap-4">

        <input
            ref={modalTittleRef}
            autoFocus
            value={TittleValue}
            onFocus={handleTittleFocus}
            onChange={(e) => setTittleValue(e.target.value)}
            className=" overflow-x-auto whitespace-nowrap p-4 font-semibold text-gray-700   border-purple-700 ring-1 ring-purple-700 focus:border-purple-700 focus:ring-2 focus:ring-purple-600  rounded-lg border outline-none transition-all duration-800 sm:w-2xs mx-2 h-10"
            type="text"
            placeholder="Tittle"
            spellCheck={false} />



        <input
            ref={modalLinkRef}
            value={LinkValue}
            onFocus={handleLinkFocus}
            onChange={(e) => setLinkValue(e.target.value)}
            className=" overflow-x-auto whitespace-nowrap    p-4  font-semibold text-gray-700  border-purple-700 ring-1  ring-purple-700 focus:border-purple-700 focus:ring-2 focus:ring-purple-600 rounded-lg border outline-none transition-all duration-800  sm:w-2xs h-10"
            type="text"
            placeholder="Link"
            spellCheck={false} />

            


        <div className=" p-2 w-full flex justify-evenly items-center mt-2 ">
            <div>
                <button onClick={() => setType("youtube")}
                    className={type == "youtube" ? "  bg-purple-800 sm:w-26 sm:h-11 w-20 cursor-pointer rounded-md text-white  font-semibold py-3 " : " bg-gray-400 sm:w-26 sm:h-11 cursor-pointer rounded-md text-white  font-semibold py-3"}>
                    youtube
                </button>
            </div>

            <div><button onClick={() => setType("twitter")}
                className={type == "twitter" ? "items-center justify-center  bg-purple-800 sm:w-26 sm:h-11 w-20 cursor-pointer rounded-md text-white font-semibold py-3 " : "items-center justify-center  bg-gray-400 sm:w-26 sm:h-11 w-20 cursor-pointer  rounded-md text-white font-semibold py-3 "}>
                twitter
            </button>
            </div>
        </div>

        <button onClick={AddButtonHandler} disabled={isButtonDisabled}
            className="flex  mt-5 items-center justify-center bg-black sm:w-36 sm:h-11 w-27 cursor-pointer hover:bg-gray-800 rounded-md text-white border border-white   font-semibold py-3 ">
            Add
        </button>

        {Alert && <AlertComponent option={true } text={alertText}/>}

    </div>
}