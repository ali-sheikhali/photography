import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.svg";
import instagram1 from "../../assets/instagram1.svg";
import CostModal from "../CostModal";
import BottomSheet from "@wldyslw/react-bottom-sheet";
import { Link } from "react-router-dom";

interface Services {
  scrollToSection?: {
    work: () => void;
  };
}
interface BottomSheetRef {
  open: () => void;
  close?: () => void;
}
function NavBarHome({ scrollToSection }: Services) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const bottomSheetRef = useRef<BottomSheetRef | null>(null);

  const handleClick = () => {
    console.log("log log");

    setOpenMenu(false);
    if (bottomSheetRef.current) {
      bottomSheetRef.current?.open();
    }
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div className="w-full bg-[#1D1818] text-[#FAFAFA] py-2 z-10 border-b border-[#247D7B] relative">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
          <img src={logo} alt="logo" />
          </Link>
          <button className="sm:hidden" onClick={() => setOpenMenu(true)}>
            <img src={menu} alt="menu" />
          </button>
          <div className="gap-4 hidden sm:flex">
            <p
              className="cursor-pointer"
              onClick={() => scrollToSection?.work()}
            >
              نمونه کارها
            </p>
            <p className="cursor-pointer" onClick={() => setOpenModal(true)}>
              لیست قیمت
            </p>
            <p>تماس با ما</p>
            <Link to="/blogs">
            <p>بلاگ</p>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p>kokoro.official</p>
          <img src={instagram1} alt="instagram" />
        </div>
      </div>
      <div
        ref={menuRef}
        className={`w-6/12 h-screen absolute top-0 right-0 bg-[#1D1818] text-white transform transition-transform duration-300 ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-10/12 mx-auto flex flex-col gap-4 py-6">
          <p>نمونه کارها</p>
          <p className="cursor-pointer" onClick={handleClick}>
            لیست قیمت
          </p>
          <p>تماس با ما</p>
          <Link to="/blogs">
          <p>بلاگ</p>
          </Link>
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="inset-0 absolute backdrop-blur-sm"></div>
          <div className="relative w-6/12  rounded-lg py-8 px-4 ">
            <CostModal setOpenModal={setOpenModal} rounded={false} />
          </div>
        </div>
      )}
      <BottomSheet
        detents={["70%"]}
        ref={bottomSheetRef}
        className="bg-black h-full text-white"
      >
        <CostModal setOpenModal={setOpenModal} rounded={true} />
      </BottomSheet>
    </div>
  );
}

export default NavBarHome;
