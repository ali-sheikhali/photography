import { useEffect, useState } from "react";

export function useResponsiveBg(mobileImage: string) {
  const [bgImage, setBgImage] = useState(mobileImage);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setBgImage(""); // Remove background on lg and larger
      } else {
        setBgImage(mobileImage); // Show background on smaller screens
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileImage]);

  return bgImage;
}
