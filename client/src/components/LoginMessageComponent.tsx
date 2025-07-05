import { useEffect, useState } from "react";
import { LoginIcon } from "../icons/LoginIcon";

export function LoginMessageComponent() {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    setSlideIn(true);
  }, []);

  return (
    <div className="relative h-screen bg-black">
      <div
        className={`fixed  top-8 left-5 text-5xl text-white w-lg h-25 font-bold flex justify-start items-center gap-1 p-1 transition-transform duration-900 transform ${
          slideIn ? "translate-x-0" : "translate-x-[100vw]"
        }`}
      >
        <LoginIcon />
                    <div className="flex w-sm h-20 justify-start pb-1 pl-1 items-center text-3xl sm:text-5xl  ">Let's, Login! Now</div></div>
    
    </div>
  );
}