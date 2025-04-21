import SubTitle from "./SubTitle";
import arrowLeft from "../../assets/arrow-left.svg";
import { Link } from "react-router-dom";
import usePhotos from "../../hooks/usePhotos";


function ExampleOfWork() {

    const photos = usePhotos()
    
  return (
    <div className="w-full flex flex-col gap-8">
      <SubTitle title="نمونه کارهای ما" />
      <Link to="/details">
        <div className="flex justify-end items-center">
          <p className="text-[#247D7B] text-xl">مشاهده بیشتر</p>
          <img src={arrowLeft} alt="arrow-left" />
        </div>
      </Link>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.slice(0, 4).map((item) => (
          <div className="" key={item.id}>
            <img
              className="rounded-xl h-[350px] object-cover lg:h-[450px] w-full"
              src={item.url}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExampleOfWork;
