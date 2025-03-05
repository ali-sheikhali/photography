import React from "react";
import SubTitle from "./SubTitle";
import PhotoGrapther from "./PhotoGrapther";
import picture from "../../assets/picture.jpg";
import person from "../../assets/person.jpg";

// تعریف نوع داده برای عکاسان
interface Photographer {
  id: number;
  firstName: string;
  lastName: string;
  profileImage: string;
  category: string;
  portfolio: string[];
}

const TopPhotographers: React.FC = () => {
  const data: Photographer[] = [
    {
      id: 1,
      firstName: "علی",
      lastName: "محمدی",
      profileImage: person,
      category:"عکاس خیابانی",
      portfolio: [picture, picture, picture, picture],
    },
    {
      id: 2,
      firstName: "مریم",
      lastName: "رضایی",
      profileImage: person,
      category:"عکاس مستند",
      portfolio: [picture, picture, picture, picture],
    },
  ];

  return (
    <div className="w-full flex flex-col gap-8 ">
      <SubTitle title="عکاسان برتر کوکورو" />
      <div className="grid grid-cols-1 gap-8">
        {data.map((photographer) => (
          <PhotoGrapther key={photographer.id} photographer={photographer} />
        ))}
      </div>
    </div>
  );
};

export default TopPhotographers;
