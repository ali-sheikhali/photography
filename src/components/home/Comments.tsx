import { useEffect, useState } from "react";
import SubTitle from "./SubTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { fetchComments } from "../../services/fetchComments";
import "swiper/css";
import "swiper/css/pagination";
interface Comments {
  id: number;
  name: string;
  image: string;
  text: string;
}
function Comments() {
  const [comments, setComments] = useState<Comments[]>([]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadComments();
  }, []);
  const [mobile, setMobile] = useState(false);
  const [tablet, setTablet] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMobile(true);
        setTablet(false);
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
            {comments.map((comment) => (
              <SwiperSlide>
                <div className="h-72" key={comment.id}>
                  <div className="flex flex-col h-60 gap-6 justify-around items-start px-3 py-5 rounded-2xl bg-[#FAFAFA]">
                    <h4 className="font-bold text-xl ">
                      {comment.name}
                    </h4>
                    <p className=" flex-grow overflow-hidden">
                      {comment.text}
                    </p>
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
