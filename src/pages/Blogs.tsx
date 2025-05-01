import { useEffect, useState } from "react";
import NavBarHome from "../components/home/NavBarHome";
import Footer from "../components/home/Footer";
import { fetchBlogs } from "../services/fetchBlogs";
interface Blogs {
  id: number;
  title: string;
  description: string;
  image: string;
}
const Blogs = () => {
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadBlogs();
  }, []);
  return (
    <div className="bg-[#1D1818] min-h-screen text-white">
      <NavBarHome notNeedMenu />
      <div className="w-11/12 mx-auto flex flex-col gap-12 my-12">
        {blogs.map((blog, index: number) => (
          <div
            className={`flex flex-col md:flex-row gap-6 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            key={blog.id}
          >
            <img
              className="w-full h-[230px] md:h-[315px] object-cover rounded-md md:w-6/12"
              src={blog.image}
              alt="image"
            />
            <div className="flex flex-col gap-4 md:w-6/12 md:h-[315px] leading-7 md:leading-10 overflow-hidden">
              <h3 className="font-semibold">{blog.title}</h3>
              <p>{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
