import React from "react";
import SubTitle from "./SubTitle";
import camera from "../../assets/camera.svg";
import addHome from "../../assets/add-home.svg";
function Services() {
  return (
    <div className="w-full">
      <SubTitle title="سرویس های ما" />
      <div className="text-white flex justify-center items-center my-8 gap-4 md:w-7/12 mx-auto">
        <div className="w-6/12">
          <figure className="flex flex-col justify-center items-center gap-4">
            <img
              className="bg-transparent flex justify-center items-center w-8 h-8"
              src={addHome}
              alt="add-home"
            />
            <h4 className="font-bold">ادیت عکس</h4>
            <p className="text-center text-sm md:w-6/12 mx-auto">
              تبدیل تصاویر به آثار هنری با ویرایش دقیق و خلاقانه
            </p>
          </figure>
        </div>
        <div className="w-6/12">
          <figure className="flex flex-col justify-center items-center gap-4 ">
            <img
              className="bg-transparent flex justify-center items-center w-8 h-8"
              src={camera}
              alt="camera"
            />
            <h4 className="font-bold">عکس برداری</h4>
            <p className="text-center text-sm md:w-6/12 mx-auto">
              عکس برداری از چهره ثبت لحظاتی خاص با ترکیب نور، رنگ و احساسات
              واقعی
            </p>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default Services;
