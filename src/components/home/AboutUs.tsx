import React from "react";
import SubTitle from "./SubTitle";
import about from "../../assets/about.jpg";
const AboutUs = () => {
  return (
    <div className="flex flex-col gap-8">
      <SubTitle title="درباره ما" />
      <div className="w-full flex flex-col md:flex-row gap-8">
        <img src={about} alt="about-us" className="rounded-xl xl:rounded-2xl w-full h-72 md:h-96 md:w-6/12" />
        <p className="text-[#FAFAFA] leading-7 md:w-6/12 md:leading-9 xl:leading-12 2xl:leading-14">
          ما در کوکورو از سال ۱۴۰۰ با عشق و خلاقیت قدم به دنیای عکاسی گذاشتیم تا
          لحظات شما را جاودانه کنیم. برای ما، عکاسی فقط یک هنر نیست، بلکه راهی
          برای روایت داستان‌ها، احساسات و زیبایی‌های بی‌پایان زندگی است.با بیش
          از ۳ سال تجربه در زمینه عکاسی، فیلم‌برداری و ادیت حرفه‌ای، تلاش
          می‌کنیم بهترین لحظات شما را با نگاهی هنرمندانه و تکنیک‌های حرفه‌ای به
          تصویر بکشیم. چه در قاب طبیعت، چه در هیجان خیابان، چه در خاطرات ماندگار
          شما، ما اینجاییم تا با دقت و ظرافت، عکس‌هایی بیافرینیم که هر بار
          نگاهشان کنید، همان حس و لحظه را دوباره زندگی کنید. <br />✨ در قاب ما، هر
          تصویر یک داستان است...
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
