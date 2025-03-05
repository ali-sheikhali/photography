import React from "react";

interface Photographer {
  id: number;
  firstName: string;
  lastName: string;
  profileImage: string;
  category: string;

  portfolio: string[];
}

const PhotoGrapther: React.FC<{ photographer: Photographer }> = ({
  photographer,
}) => {
  return (
    <div className="bg-[#1D4444] flex flex-col gap-4 p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {photographer.portfolio.map((image, index) => (
          <img
            key={index}
            className="rounded-xl h-[250px] md:h-[350px] object-cover w-full"
            src={image}
            alt={`Portfolio ${index + 1}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src={photographer.profileImage}
          alt={photographer.firstName}
        />
        <div>
          <h2 className="text-lg font-semibold text-white">
            {photographer.firstName} {photographer.lastName}
          </h2>
          <p className="text-white text-sm">{photographer.category}</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoGrapther;
