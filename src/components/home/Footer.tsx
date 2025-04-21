import callCalling from "../../assets/call-calling.svg";
import sms from "../../assets/sms.svg";
import telegram from "../../assets/telegram.svg";
import pinterest from "../../assets/pinterest.svg";
import instagram from "../../assets/instagram.svg";
import whatsapp from "../../assets/whatsapp.svg";
interface FooterProps {
  scrollToSection?: {
    services?: () => void;
    work?: () => void;
    comments?: () => void;
    aboutUs?: () => void;
  };
}
const Footer = ({scrollToSection}:FooterProps) => {
  return (
    <div className="w-full border-t border-[#247D7B] rounded-sm">
      <div className="w-11/12 mx-auto py-6 flex gap-2">
        <div className=" flex-col gap-4 text-white w-4/12 hidden lg:flex">
          <h3 className="font-bold text-xl">ارتباط با ما</h3>
          <div className="flex gap-2">
            <img src={callCalling} alt="" />
            <p>۰۲۱-۲۲۵۶۷۸۹۶</p>
          </div>
          <div className="flex gap-2">
            <img src={sms} alt="" />
            <p>kokoro1390@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-white w-4/12">
          <h3 className="font-bold text-xl">دسترسی سریع</h3>
          <p className="cursor-pointer" onClick={scrollToSection?.services}>سرویس های کوکورو</p>
          <p className="cursor-pointer" onClick={scrollToSection?.work}>نمونه کارهای ما</p>
          <p className="cursor-pointer" onClick={scrollToSection?.comments}>نظرات کاربران</p>
          <p className="cursor-pointer" onClick={scrollToSection?.aboutUs}>درباره ما</p>
        </div>
        <div className="flex flex-col items-center lg:justify-center gap-4 py-4 w-8/12 text-white ">
          <div className="bg-[#292524] rounded-lg w-full flex flex-col items-center gap-4 py-4 ">
            <div className="lg:hidden flex flex-col items-center gap-4 ">
              <div className="flex gap-2">
                <img src={callCalling} alt="" />
                <p>۰۲۱-۲۲۵۶۷۸۹۶</p>
              </div>
              <div className="flex gap-2">
                <img src={sms} alt="" />
                <p>kokoro1390@gmail.com</p>
              </div>
            </div>
            <p className="w-10/12 mx-auto text-center text-sm">
              پاسخگویی از شنبه تا چهارشنه از ساعت ۱۰ الی ۱۸ و پنج شنبه و روز های
              تعطیل از ۱۰ الی ۱۴
            </p>
          </div>
          <div className="flex flex-row-reverse justify-center items-center gap-2">
            <img src={telegram} alt="telegram" />
            <img src={instagram} alt="instagram" />
            <img src={whatsapp} alt="whatsapp" />
            <img src={pinterest} alt="pinterest" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
