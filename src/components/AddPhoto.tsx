import React, { useEffect, useRef, useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import AddModal from "./AddModal";
import NewPhoto from "./NewPhoto";
import BottomSheet from "@wldyslw/react-bottom-sheet";
import { fetchPhoto } from "../services/fetchPhoto";
import trash from "../assets/trash.svg";
import { deletePhoto } from "../services/deletePhoto";

interface Photos {
  id: string;
  photographerId: number;
  url: string;
  genre: string;
}
interface BottomSheetRef {
  open: () => void;
  close?: () => void;
}

const AddPhoto = () => {
  const [openModal, setOpenModal] = useState(false);
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
  useEffect(() => {
    const loadPhoto = async () => {
      try {
        setLoading(true);
        const data: Photos = await fetchPhoto();
        setPhotos(data);
      } catch (error) {
        console.error("خطا در دریافت لیست عکاسان:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPhoto();
  }, []);
  const handleDelete = async (id: string) => {
    try {
      await deletePhoto(id);
      setPhotos(photos.filter((photo) => photo.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex justify-end items-end">
        <div className=" w-6/12 md:w-2/12 " onClick={handleAddPhoto}>
          <button className="buttonOfForm cursor-pointer">افزودن</button>
        </div>
      </div>
      {loading ? (
        "چند لحظه صبر کنید"
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className=" p-4 h-[280px] md:h-[390px] rounded-lg relative"
            >
              <img
                src={photo.url}
                alt={photo.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <img
                onClick={() => handleDelete(photo.id)}
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
              <NewPhoto
                setOpenModal={setOpenModal}
                title="افزودن عکاس"
                onPhotoAdded={(newPhoto) => {
                  setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
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
        <NewPhoto
          bottomSheetRef={bottomSheetRef}
          title="افزودن عکاس"
          onPhotoAdded={(newPhoto) => {
            setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
          }}
        />
      </BottomSheet>
    </div>
  );
};

export default AddPhoto;
