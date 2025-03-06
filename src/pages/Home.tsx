import NavBarHome from "../components/home/NavBarHome";
import HeroHeader from "../components/home/HeroHeader";
import Services from "../components/home/Services";
import ExampleOfWork from "../components/home/ExampleOfWork";
import TopPhotographers from "../components/home/TopPhotographers";
import Comments from "../components/home/Comments";
import CommentsSuggestions from "../components/home/CommentsSuggestions";
import AboutUs from "../components/home/AboutUs";

function Home() {
  return (
    <div className="bg-[#1D1818]">
      <NavBarHome />
      <main className="w-11/12 mx-auto flex flex-col gap-20 mt-8">
        <HeroHeader />
        <Services />
        <ExampleOfWork />
      </main>
      <div className="my-20 flex flex-col gap-20">
        <TopPhotographers />
        <Comments />
        <div className="w-11/12 mx-auto flex flex-col gap-20 ">
          <CommentsSuggestions />
          <AboutUs />
        </div>
      </div>
    </div>
  );
}

export default Home;
