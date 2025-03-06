import React, { useEffect, useState } from "react";
import SubTitle from "./SubTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import person from "../../assets/person.jpg";

interface Data {
  id: number;
  name: string;
  image: string;
  description: string;
}
function Comments() {
  const data: Data[] = [
    {
      id: 1,
      name: "علی احمدی",
      image: person,
      description:
        "وقتی به عکس‌ها نگاه می‌کنم، فقط یک تصویر نمی‌بینم؛ بلکه حس، داستان و لحظه‌ای را تجربه می‌کنم که در زمان منجمد شده است. ترکیب نور، رنگ و زاویه‌ی دید در این عکس‌ها بی‌نظیر است. هر قاب، روایت خودش را دارد و این چیزی است که عکاسی را فراتر از یک تصویر ساده می‌برد. واقعاً تحسین‌برانگیز!",
    },
    {
      id: 2,
      name: "علی هاشمی",
      image: person,
      description:
        "وقتی به عکس‌ها نگاه می‌کنم، فقط یک تصویر نمی‌بینم؛ بلکه حس، داستان و لحظه‌ای را تجربه می‌کنم که در زمان منجمد شده است. ترکیب نور، رنگ و زاویه‌ی دید در این عکس‌ها بی‌نظیر است. هر قاب، روایت خودش را دارد و این چیزی است که عکاسی را فراتر از یک تصویر ساده می‌برد. واقعاً تحسین‌برانگیز!",
    },
    {
      id: 3,
      name: "علی کاظمی",
      image: person,
      description:
        "وقتی به عکس‌ها نگاه می‌کنم، فقط یک تصویر نمی‌بینم؛ بلکه حس، داستان و لحظه‌ای را تجربه می‌کنم که در زمان منجمد شده است. ترکیب نور، رنگ و زاویه‌ی دید در این عکس‌ها بی‌نظیر است. هر قاب، روایت خودش را دارد و این چیزی است که عکاسی را فراتر از یک تصویر ساده می‌برد. واقعاً تحسین‌برانگیز!",
    },
    {
      id: 4,
      name: "علی ناصری",
      image: person,
      description:
        "وقتی به عکس‌ها نگاه می‌کنم، فقط یک تصویر نمی‌بینم؛ بلکه حس، داستان و لحظه‌ای را تجربه می‌کنم که در زمان منجمد شده است. ترکیب نور، رنگ و زاویه‌ی دید در این عکس‌ها بی‌نظیر است. هر قاب، روایت خودش را دارد و این چیزی است که عکاسی را فراتر از یک تصویر ساده می‌برد. واقعاً تحسین‌برانگیز!",
    },
    {
      id: 5,
      name: "علی مجیدی",
      image: person,
      description:
        "وقتی به عکس‌ها نگاه می‌کنم، فقط یک تصویر نمی‌بینم؛ بلکه حس، داستان و لحظه‌ای را تجربه می‌کنم که در زمان منجمد شده است. ترکیب نور، رنگ و زاویه‌ی دید در این عکس‌ها بی‌نظیر است. هر قاب، روایت خودش را دارد و این چیزی است که عکاسی را فراتر از یک تصویر ساده می‌برد. واقعاً تحسین‌برانگیز!",
    },
  ];
  const [mobile, setMobile] = useState(false);
  const [tablet, setTablet] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMobile(true);
        setTablet(false)
      } else if (window.innerWidth < 1024) {
        setTablet(true);
        setMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);
  return (
    <div className="w-full flex flex-col gap-8 ">
      <SubTitle title="نظرات کاربران ما" />
      <div className="w-full bg-[#1D4444]">
        <div className="w-11/12 mx-auto py-10">
          <Swiper
            slidesPerView={mobile ? 1 : tablet ? 2 : 3}
            spaceBetween={50}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {data.map((item) => (
              <SwiperSlide>
                <div className="" key={item.id}>
                  <div className="flex flex-col gap-6 justify-center items-center px-6 py-20 rounded-2xl bg-[#FAFAFA]">
                    <img
                      src={item.image}
                      alt="image"
                      className="rounded-full w-20 h-20"
                    />
                    <h4 className="font-bold text-xl ">{item.name}</h4>
                    <p className="text-center">{item.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-pagination flex justify-center mt-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
