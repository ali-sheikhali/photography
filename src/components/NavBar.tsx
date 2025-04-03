import React, { useContext, useRef, useState } from "react";
import logo from "../assets/logo.png";
import profile from "../assets/Profile.jpg";
import lock from "../assets/lock.png";
import logOut from "../assets/logout.png";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import edit from "../assets/edit-2.svg";
import useIsMobile from "../hooks/useIsMobile";
import AddModal from "./AddModal";
import BottomSheet from "@wldyslw/react-bottom-sheet";
import ChangePassword from "./ChangePassword";


interface BottomSheetRef{
  open: () => void;
  close?: () => void;
}
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal , setOpenModal] = useState(false)
  const isMobile = useIsMobile()
  const bottomSheetRef = useRef<BottomSheetRef>(
      null as unknown as BottomSheetRef
    );
  // Close dropdown when clicking outside
  const closeDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as HTMLElement).closest(".dropdown-container")) {
      setIsOpen(false);
    }
  };
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    if (auth) {
      auth.logout();
      navigate("/login");
    }
  };

  const passwordHandleClick = () => {
    setIsOpen(false);
    if (isMobile) {
      bottomSheetRef.current?.open(); 
    } else {
      setOpenModal(true); 
    }
  };
  return (
    <div className="w-full bg-[#0A0A0A] text-white relative">
      <div className="w-11/12 mx-auto flex items-center gap-6 relative">
        <img src={logo} alt="Logo" />

        <div className="relative dropdown-container z-30">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="m-1 list-none relative z-30"
          >
            <figure>
              <img
                className="rounded-full w-12 h-12"
                src={profile}
                alt="Profile"
              />
            </figure>
          </button>

          {isOpen && (
            <div
              className="fixed inset-0 backdrop-blur-xl z-10"
              onClick={closeDropdown}
            ></div>
          )}

          {isOpen && (
            <ul className="absolute top-16 z-20 bg-[#171717] rounded-md p-4 md:right-0 -right-28 text-[#D4D4D4] w-80 shadow">
              <li className="flex items-center gap-3 border-b border-[#737373] p-4">
                <div className="flex items-center gap-2">
                <figure>
                  <img
                    className="rounded-full w-8 h-8"
                    src={profile}
                    alt="Profile"
                  />
                </figure>
                <p>علی احمدی</p>
                </div>
              </li>
              <li className="flex items-center justify-between gap-3 border-b border-[#737373] p-4">
                <div className="flex items-center gap-2">
                  <figure>
                    <img className="w-8 h-8" src={lock} alt="Lock" />
                  </figure>
                  <p>رمز عبور</p>
                </div>
                  <img onClick={passwordHandleClick} src={edit} alt="" />
              </li>
              <li
                className="flex items-center gap-3 p-4 cursor-pointer"
                onClick={handleLogOut}
              >
                <figure>
                  <img className="w-8 h-8" src={logOut} alt="Logout" />
                </figure>
                <p>خروج</p>
              </li>
            </ul>
          )}
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="inset-0 absolute backdrop-blur-sm"></div>
          <div className="relative w-6/12 rounded-lg py-8 px-4">
            <AddModal rounded={false}>
              <ChangePassword title="رمز جدید" setOpenModal={setOpenModal} />
            </AddModal>
          </div>
        </div>
      )}
      <BottomSheet
        detents={["65%"]}
        ref={bottomSheetRef}
        className="!bg-[#171717] text-white w-full py-4 mx-auto"
      >
       <ChangePassword title="رمز جدید" bottomSheetRef={bottomSheetRef} />
      </BottomSheet>
    </div>
  );
}

export default NavBar;
