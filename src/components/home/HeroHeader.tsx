import React from "react";
import heroHeader from "../../assets/hero.jpg";
import music from "../../assets/music.mp3";
function HeroHeader() {
  return (
    <div>
      <div className="w-full my-8 relative">
        <img
          className="w-full h-[230px] sm:h-[300px] md:h-[400px] lg:h-[600px] rounded-2xl"
          src={heroHeader}
          alt="hero-header"
        />
        <audio className="w-11/12 absolute bottom-2  bg-transparent  " controls loop>
          <source src={music} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}

export default HeroHeader;
