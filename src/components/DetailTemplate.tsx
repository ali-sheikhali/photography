import React from "react";

interface DetailTemplateProps {
  description: string;
  photo: string[];
}
const DetailTemplate: React.FC<DetailTemplateProps> = ({
  description,
  photo,
}) => {
  return (
    <div className="p-6 flex flex-col gap-8">
      <p className="mb-4">{description}</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {photo.map((item, index: number) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <img
              src={item}
              alt="photo"
              className="w-full object-cover h-[300px] lg:h-[400px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailTemplate;
