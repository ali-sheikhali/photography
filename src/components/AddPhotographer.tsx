import React, { useEffect, useRef, useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import AddModal from "./AddModal";
import NewPhotoprapher from "./NewPhotoprapher";
import BottomSheet from "@wldyslw/react-bottom-sheet";
import { fetchPhotographer } from "../services/fetchPhotoprapher";
import trash from "../assets/trash.svg";
import { deletePhotographer } from "../services/deletePhotographer";
interface BottomSheetRef {
  open: () => void;
  close?: () => void;
}
interface Photographer {
  id: string;
  name: string;
  image: string;
  genre: string;
}

const AddPhotographer = () => {
  const [openModal, setOpenModal] = useState(false);
  const bottomSheetRef = useRef<BottomSheetRef>(
    null as unknown as BottomSheetRef
  );
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState<boolean>(true);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);

  const handleAddPhotographer = () => {
    if (isMobile) {
      bottomSheetRef.current?.open();
    } else {
      setOpenModal(true);
    }
  };
  useEffect(() => {
    const loadPhotographer = async () => {
      try {
        setLoading(true);
        const data = await fetchPhotographer();
        setPhotographers(data);
      } catch (error) {
        console.error("خطا در دریافت لیست عکاسان:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPhotographer();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deletePhotographer(id);
      setPhotographers(
        photographers.filter((photographer) => photographer.id !== id)
      );
    } catch {
      alert("عکاس حذف نشد");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex justify-end items-end">
        <div className=" w-6/12 md:w-2/12 " onClick={handleAddPhotographer}>
          <button className="buttonOfForm cursor-pointer">افزودن</button>
        </div>
      </div>
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photographers.map((photographer) => (
            <div
              key={photographer.id}
              className=" p-4 h-[280px] md:h-[390px] rounded-lg relative"
            >
              <img
                src={photographer.image}
                alt={photographer.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <img
                onClick={() => handleDelete(photographer.id)}
                src={trash}
                className="border-2 cursor-pointer border-[#DC2626] h-8 w-8 p-1 rounded-lg absolute left-7 bottom-7"
              />
            </div>
          ))}
        </div>
      )}
      {openModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center  z-50">
          <div className="inset-0 absolute backdrop-blur-sm"></div>
          <div className="relative w-6/12  rounded-lg py-8 px-4 ">
            <AddModal rounded={false}>
              <NewPhotoprapher
                setOpenModal={setOpenModal}
                title="افزودن عکاس"
                onPhotographerAdded={(newPhotographer) => {
                  setPhotographers((prevPhotographers) => [
                    ...prevPhotographers,
                    newPhotographer,
                  ]);
                }}
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
        <NewPhotoprapher
          setOpenModal={setOpenModal}
          bottomSheetRef={bottomSheetRef}
          title="افزودن عکاس"
        />
      </BottomSheet>
    </div>
  );
};

export default AddPhotographer;
