import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.jpg";
import menu from "../../assets/menu.svg";
import instagram1 from "../../assets/instagram1.svg";
import CostModal from "../CostModal";
import BottomSheet from "@wldyslw/react-bottom-sheet";
import { Link } from "react-router-dom";

interface Services {
  scrollToSection?: {
    work: () => void;
    footer: () => void;
  };
  notNeedMenu?: boolean;
}
interface BottomSheetRef {
  open: () => void;
  close?: () => void;
}
function NavBarHome({ scrollToSection, notNeedMenu }: Services) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const bottomSheetRef = useRef<BottomSheetRef | null>(null);

  const handleClick = () => {
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
          {!notNeedMenu && (
            <button className="sm:hidden" onClick={() => setOpenMenu(true)}>
              <img src={menu} alt="menu" />
            </button>
          )}
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className=" border-none w-16 h-16 sm:w-22 sm:h-22 object-contain"
            />
          </Link>
          {!notNeedMenu && (
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
              <p
                className="cursor-pointer"
                onClick={() => scrollToSection?.footer()}
              >
                تماس با ما
              </p>
              <Link to="/blogs">
                <p>بلاگ</p>
              </Link>
            </div>
          )}
        </div>
        <a
          href="https://www.instagram.com/Kokoro__photography"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <p>Kokoro__photography</p>
            <img src={instagram1} alt="instagram" className="mb-1" />
          </div>
        </a>
      </div>
      {!notNeedMenu && (
        <div
          ref={menuRef}
          className={`w-6/12 h-screen absolute top-0 right-0 bg-[#1D1818] text-white transform transition-transform duration-300 ${
            openMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="w-10/12 mx-auto flex flex-col gap-4 py-6">
            <p
              onClick={() => {
                scrollToSection?.work();
                setOpenMenu(false);
              }}
            >
              نمونه کارها
            </p>
            <p className="cursor-pointer" onClick={handleClick}>
              لیست قیمت
            </p>
            <p
              className="cursor-pointer"
              onClick={() => {
                scrollToSection?.footer();
                setOpenMenu(false);
              }}
            >
              تماس با ما
            </p>
            <Link to="/blogs">
              <p>بلاگ</p>
            </Link>
          </div>
        </div>
      )}
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
