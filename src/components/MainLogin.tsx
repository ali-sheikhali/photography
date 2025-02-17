import { useResponsiveBg } from "../hooks/useResponsiveBg";
import mobileBack from "../assets/halftone-monochrome-collage1.jpg";
import { ReactNode } from "react";

interface MainLoginProps{
    children: ReactNode;
}
function MainLogin({ children }:MainLoginProps) {
  const bgImage = useResponsiveBg(mobileBack);

  return (
    <main
      className="h-screen bg-no-repeat bg-cover flex justify-center items-center md:bg-none"
      style={{ backgroundImage: bgImage ? `url(${mobileBack})` : "none" }}
    >
      <div
        className={`absolute inset-0 ${
          bgImage ? "bg-[#1D1818]" : "bg-none"
        } opacity-80`}
      ></div>
      <div
        className="bg-[#171717] lg:bg-gradient-to-l from-80%  from-[#171717] to-[#145453]
            w-11/12 lg:w-full lg:h-screen lg:rounded-none lg:flex  mx-auto z-50 py-20 rounded-lg"
      >
        {children}
      </div>
    </main>
  );
}

export default MainLogin;
