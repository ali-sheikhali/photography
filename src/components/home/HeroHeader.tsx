import React from "react";
import heroHeader from "../../assets/hero.jpg";
import AudioPlayer from "./AudioPlayer";

function HeroHeader() {
  return (
    <div className="relative w-full">
      <img
        className="w-full h-[230px] sm:h-[300px] md:h-[400px] lg:h-[600px] rounded-2xl object-cover"
        src={heroHeader}
        alt="hero-header"
      />

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 backdrop-blur-sm rounded-xl">
        <main className="">
          {/* <AudioPlayer /> */}
        </main>
      </div>
    </div>
  );
}

export default HeroHeader;
