import { useState } from "react";
import NavBarHome from "../components/home/NavBarHome";
import DetailTemplate from "../components/DetailTemplate";
import Footer from "../components/home/Footer";
import usePhotos from "../hooks/usePhotos";

interface Data {
  title: string;
  name: string;
  description: string;
  photo: string[];
}
const Details = () => {
  const [activeTab, setActiveTab] = useState("nature");
  const photos = usePhotos();
  const data: Data[] = [
    {
      title: "nature",
      name: "طبیعت",
      description:
        "ما همه انسانهایی حساس هستیم. عکاس بودن ما ، نباید باعث فراموشی آن شود. هر موقعیت از زندگی و هر شخصی در اطرافمان ، فرصتی است برای یکی شدن روحمان با آنها . اگر عکس بتواند بیانگر یکی شدن روح ها باشد ، پس عکاس نه تنها در کارش بلکه در یکی از تجربه های بسیار زیبا در زندگی نیز موفق بوده است .",
      photo: [],
    },
    {
      title: "street",
      name: "خیابانی",
      description:
        "چیزهای زیادی برای شکرگزاری وجود دارد : غروب زیبای آفتاب ، درخشش شبنم بر تار عنکبوت ، آرامش سحرگاه و پرنده هایی که با یکدیگر نجوا می کنند ، لحظه ای که احساس میکنید جهان می ایستد و آن لحظه را برای همیشه در ذهن خود حک می کنید لبخند یک دوست ، نگاهی خاص از عشقی یگانه در زندگی ، هنگامی که گربه ها خود را لوس میکنند و دلیلی است تا به آرامی بنشینید و به قدر کافی نوازششان کنید ، خنده ی یک کودک ، نغمه ای زیبا ، عکسی گیرا ، لحظه هایی که چنین خشنودیهای بزرگی دوام دارند و پیوسته شما را به جایی میبرند که همواره مشتاقش بودید آگاه از هر لحظه زندگی در حال ، نه آینده و نه گذشته .",
      photo: [],
    },
    {
      title: "abstract",
      name: "انتزاعی",
      description:
        "هر عکسی که میگیریم به طور کلی چیزهایی درباره ی خود ، زندگی و جهان به ما می آموزد. من خالق عکس نیستم بلکه تصاویر ، پیشاپیش در انتظارند تا کشف و ثبت شوند. در این کشف عاطفی است که چیزهای جدیدی درباره ی خود و موضوع می آموزیم. هر تجربه پشتوانه ی تجربه ی دیگری است که به شکل گیری و چیستی ما کمک می کند .",
      photo: [],
    },
    {
      title: "light",
      name: "نور",
      description:
        "چشم من دوربین من است و مغزم فیلمی است که تصویر در آن ثبت می شود. اما چیزی در من است که در دوربین نیست؛ قلب . وقتی تصاویر را در ذهنم می بینم ، هیجاناتی را در قلبم احساس میکنم و این همان چیزی است که دوربین فاقد آن است. دوربین همانند من قادر به ثبت تصویر است اما نمیتواند آنچه را من احساس میکنم حس کند .",
      photo: [],
    },
    {
      title: "documentary",
      name: "مستند",
      description:
        "برای انتقال حس وحال دنیای خود به دیگری نیازی به دوربین قلم یا برگی کاغذ نیست موضوع غریبی است هرگاه رابطه جهان را باخود حس کنی را ابزار آن را یافته ای این راه ممکن است عکاسی ادبیات نقاشی یا حتی چشمان ولبخند بی ریایت باشد آن را خواهی یافت",
      photo: [],
    },
  ];
  const updatedData = data.map((item) => ({
    ...item,
    photo: photos.filter((photo) => photo.type === item.title).map((p) => p.url),
  }));
  
  const activeData = updatedData.find((item) => item.title === activeTab);

  return (
    <div className="bg-[#1D1818] min-h-screen text-white">
      <NavBarHome notNeedMenu />
      <div className="flex w-11/12 mx-auto my-12 border-b border-[#292524] py-1">
      {updatedData.map((item, index) => (
          <div key={index}>
            <button
              className={`px-4 md:px-6 py-2 ${
                activeTab === item.title
                  ? "bg-[#247D7B] text-white rounded-xl"
                  : ""
              }`}
              onClick={() => setActiveTab(item.title)}
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>
      <div>
        {activeData && (
          <DetailTemplate
            description={activeData.description}
            photo={activeData.photo}
          />
        )}{" "}
      </div>
      <Footer />
    </div>
  );
};

export default Details;
