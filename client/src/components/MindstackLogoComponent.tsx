import { useEffect, useState } from "react";

export function MindstackLogoComponent() {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    setSlideIn(true);
  }, []);

  return (
    <div className="relative h-screen bg-black">
      <div
        className={`fixed top-1 right-4 text-white font-semibold transition-transform duration-700 transform ${
          slideIn ? "translate-x-0" : "translate-x-full"
        }`}
      >
        Mindstack
      </div>
    </div>
  );
}