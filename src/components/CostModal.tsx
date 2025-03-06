import React from "react";
import closeSquare from "../assets/close-square.svg";
interface CostModalProps {
  setOpenModal: (value: boolean) => void; // Function that updates state
  rounded?: boolean; // Optional boolean prop
}
const CostModal = ({ setOpenModal , rounded }:CostModalProps) => {
  const handleClick = () => {
    setOpenModal(false);
  };
  return (
    <>
    <div className={`flex flex-col h-full mx-auto py-8 backdrop-blur-2xl bg-[#171717] ${rounded ? "rounded-none" : "rounded-2xl" } `}>
      <div className="flex items-center w-11/12 mx-auto justify-between">
        <p>لیست قیمت</p>
        <img className="cursor-pointer" onClick={handleClick} src={closeSquare} alt="close-square" />
      </div>
      <div className="w-11/12 mx-auto flex flex-col gap-5 mt-12">
        <div className="w-full py-2 flex justify-between items-center border-b border-[#247D7B]">
          <p>عکاسی در طبیعت</p>
          <p>هرشات ۱۰۰.۰۰۰ تومان</p>
        </div>
        <div className="w-full py-2 flex justify-between items-center border-b border-[#247D7B]">
          <p>عکاسی در طبیعت</p>
          <p>هرشات ۱۰۰.۰۰۰ تومان</p>
        </div>
        <div className="w-full py-2 flex justify-between items-center border-b border-[#247D7B]">
          <p>عکاسی در طبیعت</p>
          <p>هرشات ۱۰۰.۰۰۰ تومان</p>
        </div>
        <div className="w-full py-2 flex justify-between items-center border-b border-[#247D7B]">
          <p>عکاسی در طبیعت</p>
          <p>هرشات ۱۰۰.۰۰۰ تومان</p>
        </div>
        <div className="w-full py-2 flex justify-between items-center border-b border-[#247D7B]">
          <p>عکاسی در طبیعت</p>
          <p>هرشات ۱۰۰.۰۰۰ تومان</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default CostModal;
