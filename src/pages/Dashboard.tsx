import React, { } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AddPhotographer from "../components/AddPhotographer";


function Dashboard() {

  return (
    <>
      <NavBar />
      <main className="bg-[#1D1818] text-white w-full ">
        <div className="w-11/12 mx-auto flex flex-col gap-12 md:gap-24 py-8">
          <AddPhotographer />
        </div>
        gfdsgsdg
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;
