import { useState } from "react";
import NavBar from "../components/NavBar";
import AddPhotographer from "../components/AddPhotographer";
import AddPhoto from "../components/AddPhoto";
import AddBlog from "../components/AddBlog";
import AddAbout from "../components/AddAbout";

interface Data {
  id:number, 
  title: string,
  name:string,
}

function Dashboard() {
  const [activeTab , setActiveTab] = useState("photographer")
  const data:Data[] = [
    {id:1 , title:"photographer" , name:"عکاس"},
    {id:2 , title:"photo" , name:"عکس"},
    {id:3 , title:"blog" , name:"بلاگ"},
    {id:4 , title:"about" , name:"درباره ما"},
  ]
  const activeData = data.find((item) => item.title === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-[#1D1818] text-white">
      <NavBar />
      
      <main className="w-full flex-grow">
        <div className="w-11/12 mx-auto flex flex-col py-4">
          <div className="flex md:gap-4 gap-1 my-12 border-b border-[#292524] py-1">
            {data.map((item, index) => (
              <div key={index}>
                <button
                  className={`px-6 py-2 ${
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

          {activeData?.title === "photographer" && <AddPhotographer /> }
          {activeData?.title === "photo" && <AddPhoto /> }
          {activeData?.title === "blog" && <AddBlog /> }
          {activeData?.title === "about" && <AddAbout /> }
        </div>
      </main>

     
    </div>
  );
}

export default Dashboard;
