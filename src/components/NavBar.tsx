import React, { useState } from "react";
import logo from "../assets/logo.png";
import profile from "../assets/Profile.jpg";
import lock from "../assets/lock.png";
import logOut from "../assets/logout.png";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown when clicking outside
  const closeDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as HTMLElement).closest(".dropdown-container")) {
      setIsOpen(false);
    }
  }

  return (
    <div className="w-full bg-[#0A0A0A] text-white relative">
      <div className="w-11/12 mx-auto flex items-center gap-6 relative">
        <img src={logo} alt="Logo" />

        {/* Profile Dropdown */}
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

          {/* Blurred Background (Excludes Profile) */}
          {isOpen && (
            <div
              className="fixed inset-0 backdrop-blur-xl z-10"
              onClick={closeDropdown}
            ></div>
          )}

          {/* Dropdown Menu */}
          {isOpen && (
            <ul className="absolute top-16 z-20 bg-[#171717] rounded-md p-4 md:right-0 -right-28 text-[#D4D4D4] w-80 shadow">
              <li className="flex items-center gap-3 border-b border-[#737373] p-4">
              <figure>
                  <img
                    className="rounded-full w-8 h-8"
                    src={profile}
                    alt="Profile"
                  />
                </figure>
              </li>
              <li className="flex items-center gap-3 border-b border-[#737373] p-4">
                <p>علی احمدی</p>
              </li>
              <li className="flex items-center gap-3 border-b border-[#737373] p-4">
                <figure>
                  <img className="w-8 h-8" src={lock} alt="Lock" />
                </figure>
                <p>رمز عبور</p>
              </li>
              <li className="flex items-center gap-3 p-4">
                <figure>
                  <img className="w-8 h-8" src={logOut} alt="Logout" />
                </figure>
                <p>خروج</p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
