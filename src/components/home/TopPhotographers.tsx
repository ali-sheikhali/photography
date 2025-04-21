import React, { useEffect, useState } from "react";
import SubTitle from "./SubTitle";
import PhotoGrapther from "./PhotoGrapther";
import usePhotos from "../../hooks/usePhotos"; 
import { usePhotographer } from "../../hooks/usePhotographer";

const TopPhotographers: React.FC = () => {
  const photos = usePhotos();
  const photographers = usePhotographer();
  const [updatedPhotographers, setUpdatedPhotographers] = useState([]);
  
  
  useEffect(() => {
    if (photographers.length && photos.length) {
      const groupedPhotographers = photographers.map((photographer) => ({
        ...photographer,
        portfolio: photos
          .filter((photo) => photo.photographerId === photographer.id) 
          .slice(0, 4)
          .map((photo) => photo.url),
      }));

      setUpdatedPhotographers(groupedPhotographers);
    }
  }, [photos, photographers]);

  return (
    <div className="w-full flex flex-col gap-8">
      <SubTitle title="عکاسان برتر کوکورو" />
      <div className="grid grid-cols-1 gap-8">
        {updatedPhotographers.map((photographer) => (
          <PhotoGrapther key={photographer.id} photographer={photographer} />
        ))}
      </div>
    </div>
  );
};

export default TopPhotographers;
