import React, { useRef, useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import AddModal from "./AddModal";
import NewPhotoprapher from "./NewPhotoprapher";
import BottomSheet from "@wldyslw/react-bottom-sheet";

interface BottomSheetRef {
  open: () => void;
  close?: () => void;
}

const AddPhotographer = () => {
  const [openModal, setOpenModal] = useState(false);
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const isMobile = useIsMobile();

  const handleAddPhotographer = () => {
    if (isMobile) {
      bottomSheetRef.current?.open();
    } else {
      setOpenModal(true);
    }
  };
  return (
    <div>
      <div className="w-full flex justify-end items-end">
        <div className=" w-6/12 md:w-2/12 " onClick={handleAddPhotographer}>
          <button className="buttonOfForm cursor-pointer">افزودن</button>
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center  z-50">
          <div className="inset-0 absolute backdrop-blur-sm"></div>
          <div className="relative w-6/12  rounded-lg py-8 px-4 ">
            <AddModal rounded={false}>
              <NewPhotoprapher
                setOpenModal={setOpenModal}
                title="افزودن عکاس"
              />
            </AddModal>
          </div>
        </div>
      )}
      <BottomSheet
        detents={["65%"]}
        ref={bottomSheetRef}
        className="!bg-[#171717] text-white w-full py-4 mx-auto "
      >
        <NewPhotoprapher setOpenModal={setOpenModal} title="افزودن عکاس" />
      </BottomSheet>
    </div>
  );
};

export default AddPhotographer;
