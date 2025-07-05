import { MindstackLogo } from '../icons/MindstackLogo';
import { SidebarTwitterIcon } from '../icons/SidebarTwitterIcon';
import { SidebarYoutubeIcon} from '../icons/SidebarYoutubeIcon'
import { LogoutComponent } from './LogoutCompnent';



export function SidebarComponent(){
    return <div className=' bg-white border-r-2 border-gray-300 sm:w-2xs w-35 h-screen sm:h-screen   rounded-lg shadow-lg flex-wrap  shadow-gray-600' >
    
          <div className ="flex justify-center sm:justify-start items-center mt-3 ml-2 gap-1">
            <MindstackLogo/>
            <div className='sm:text-2xl mr-1 text-sm
             tracking-wide text-black font-bold sm:p-1'>
              Mindstack
              </div>
          </div>
    
          <div className=' max-w-full  flex flex-col gap-4 flex-wrap my-8 ml-3 mr-2 max-h-96 p-2'>
    
            <div className='flex sm:gap-2 gap-2 items-center hover:font-medium sm:flex-wrap hover:cursor-pointer  '>
               <SidebarTwitterIcon/> <div>Tweets</div>
            </div>
    
            <div className='flex gap-2 hover:font-medium hover:cursor-pointer' >
            <SidebarYoutubeIcon /> <div>Videos</div>
            </div>
 </div>
            <LogoutComponent />  
    
         
          
          </div>
}