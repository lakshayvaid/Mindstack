
import { ModalCrossIcon } from "../icons/ModalCrossIcon";
import { ModalInputComponent } from "./ModalInputComponent";





interface ModalProps {
    open: boolean;
    onClose: () => void;
    onContentAdded:()=>void;
};

interface CrossProps {
    onClose: () => void;
}



//cross component
function ModalCrossComponent({ onClose }: CrossProps) {

    return <div className="  w-11 h-11  border-gray-900">
        <button className="hover:cursor-pointer" onClick={onClose} >
            <ModalCrossIcon />
        </button>

    </div>
}




export function CreateContentModal({ open, onClose , onContentAdded}: ModalProps) {
    return (open && <div>

        <div className=" fixed top-0 left-0 opacity-75 w-screen h-screen  bg-greyish-bg flex items-center justify-center ">
        </div>

        <div className="fixed top-0 left-0 opacity-100 w-screen h-screen  bg-transparent flex items-center justify-center">

            <div
                className=' sm:w-xs  rounded-xl bg-white border-2  border-purple-800 h-98  shadow-xl/70 shadow-gray-900'>

                <div className=" flex justify-end p-2.5">
                    <ModalCrossComponent onClose={onClose} />
                </div>

                <div className=" flex justify-center items-center border-none  outline-none w-full h-64  mt-6">
                    <ModalInputComponent onClose={onClose} onContentAdded={onContentAdded} />
                </div>


            </div>
        </div>

    </div>);
}