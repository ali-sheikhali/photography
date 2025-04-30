import { useRef } from "react";
import NavBarHome from "../components/home/NavBarHome";
import HeroHeader from "../components/home/HeroHeader";
import Services from "../components/home/Services";
import ExampleOfWork from "../components/home/ExampleOfWork";
import TopPhotographers from "../components/home/TopPhotographers";
import Comments from "../components/home/Comments";
import CommentsSuggestions from "../components/home/CommentsSuggestions";
import AboutUs from "../components/home/AboutUs";
import Footer from "../components/home/Footer";

function Home() {
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);
  const commentsRef = useRef<HTMLDivElement | null>(null);
  const aboutUsRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="bg-[#1D1818]">
      <NavBarHome
        scrollToSection={{
          work: () => workRef.current?.scrollIntoView({ behavior: "smooth" }),
          footer: () =>
            footerRef.current?.scrollIntoView({ behavior: "smooth" }),
        }}
      />
      <main className="w-11/12 mx-auto overflow-hidden flex flex-col gap-20 mt-8">
        <HeroHeader />
        <div ref={servicesRef}>
          <Services />
        </div>
        <div ref={workRef}>
          <ExampleOfWork />
        </div>
      </main>
      <div className="my-20 flex flex-col gap-20">
        <TopPhotographers />
        <div ref={commentsRef}>
          <Comments />
        </div>
        <div className="w-11/12 mx-auto flex flex-col gap-20 ">
          <CommentsSuggestions />
          <div ref={aboutUsRef}>
            <AboutUs />
          </div>
        </div>
      </div>
      <div ref={footerRef}>
        <Footer
          
          scrollToSection={{
            services: () =>
              servicesRef.current?.scrollIntoView({ behavior: "smooth" }),
            work: () => workRef.current?.scrollIntoView({ behavior: "smooth" }),
            comments: () =>
              commentsRef.current?.scrollIntoView({ behavior: "smooth" }),
            aboutUs: () =>
              aboutUsRef.current?.scrollIntoView({ behavior: "smooth" }),
          }}
        />
      </div>
    </div>
  );
}

export default Home;
