import React, { useEffect, useState } from "react";
import SubTitle from "./SubTitle";
import { fetchAbout } from "../../services/fetchAbout";

interface About {
  image: string;
  description: string;
}
const AboutUs = () => {
  const [about, setAbout] = useState<About[]>([]);
  useEffect(() => {
    const loadAbout = async () => {
      try {
        const data = await fetchAbout();
        setAbout(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadAbout();
  }, []);
  return (
    <div className="flex flex-col gap-8">
      <SubTitle title="درباره ما" />
      <div className="w-full flex flex-col md:flex-row gap-8">
        <img
          src={about.image}
          alt="about-us"
          className="rounded-xl xl:rounded-2xl w-full h-72 md:h-96 md:w-6/12"
        />
        <p className="text-[#FAFAFA] leading-7 md:w-6/12 md:leading-9 xl:leading-12 2xl:leading-14">
          {about.description}
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
