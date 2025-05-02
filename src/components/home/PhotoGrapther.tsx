import React, { useState } from "react";
import ImageModal from "../ImageModal";

const genreTranslations: { [key: string]: string } = {
  nature: "طبیعت",
  street: "خیابانی",
  abstract: "انتزاعی",
  light: "نور",
  documentary: "مستند",
};

interface Photographer {
  id: number;
  name: string;
  image: string;
  genre: string;
  portfolio: string[];
}

const PhotoGrapther: React.FC<{ photographer: Photographer }> = ({
  photographer,
}) => {
 const [selectedImage, setSelectedImage] = useState(null) 
  const translatedGenre = genreTranslations[photographer.genre] || photographer.genre;

  return (
    <div className="bg-[#1D4444] flex flex-col gap-4 p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {photographer.portfolio.map((image, index) => (
          <img
            key={index}
            className="rounded-xl h-[250px] md:h-[350px] object-cover w-full"
            src={image}
            alt={`Portfolio ${index + 1}`}
            onClick={() => setSelectedImage(image)} 
          />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src={photographer.image}
          alt={photographer.name}
        />
        <div>
          <h2 className="text-lg font-semibold text-white">
            {photographer.name}
          </h2>
          <p className="text-white text-sm">{translatedGenre}</p>
        </div>
      </div>
      <ImageModal image={selectedImage} onClose={()=> setSelectedImage(null)} />
    </div>
  );
};

export default PhotoGrapther;
