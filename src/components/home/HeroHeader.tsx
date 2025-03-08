import React from "react";
import heroHeader from "../../assets/hero.jpg";
import music from "../../assets/music.mp3";

function HeroHeader() {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <img
        className="w-full h-[230px] sm:h-[300px] md:h-[400px] lg:h-[600px] rounded-2xl object-cover"
        src={heroHeader}
        alt="hero-header"
      />

      {/* Custom Audio Player */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 bg-black/50 backdrop-blur-md p-4 rounded-xl">
        <audio className="w-full" controls loop>
          <source src={music} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}

export default HeroHeader;
