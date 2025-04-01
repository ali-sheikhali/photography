import React, { useEffect, useRef, useState } from "react";
import picture from "../assets/picture.jpg";
import useIsMobile from "../hooks/useIsMobile";
import AddModal from "./AddModal";
import NewPhoto from "./NewPhoto";
import BottomSheet from "@wldyslw/react-bottom-sheet";
import { fetchPhotographer } from "../services/fetchPhotoprapher";

interface Data {
  id: number;
  image: string;
}
interface BottomSheetRef {
  open: () => void;
  close?: () => void;
}

const AddPhoto = () => {
  const data: Data[] = [
    { id: 1, image: picture },
    { id: 2, image: picture },
    { id: 3, image: picture },
    { id: 4, image: picture },
  ];

  const [openModal, setOpenModal] = useState(false);
  const bottomSheetRef = useRef<BottomSheetRef>(
    null as unknown as BottomSheetRef
  );
  const isMobile = useIsMobile();

  const handleAddPhoto = () => {
    if (isMobile) {
      bottomSheetRef.current?.open();
    } else {
      setOpenModal(true);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex justify-end items-end">
        <div className=" w-6/12 md:w-2/12 " onClick={handleAddPhoto}>
          <button className="buttonOfForm cursor-pointer">افزودن</button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item) => (
          <div className="" key={item.id}>
            <img
              className="rounded-xl h-[350px] object-cover lg:h-[450px] w-full"
              src={item.image}
              alt=""
            />
          </div>
        ))}
      </div>
      {openModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center  z-50">
          <div className="inset-0 absolute backdrop-blur-sm"></div>
          <div className="relative w-6/12  rounded-lg py-8 px-4 ">
            <AddModal rounded={false}>
              <NewPhoto setOpenModal={setOpenModal} title="افزودن عکاس" />
            </AddModal>
          </div>
        </div>
      )}
      <BottomSheet
        detents={["65%"]}
        ref={bottomSheetRef}
        className="!bg-[#171717] text-white w-full py-4 mx-auto "
      >
        <NewPhoto
          setOpenModal={setOpenModal}
          bottomSheetRef={bottomSheetRef}
          title="افزودن عکاس"
        />
      </BottomSheet>
    </div>
  );
};

export default AddPhoto;
