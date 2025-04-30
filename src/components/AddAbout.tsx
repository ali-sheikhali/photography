import { useEffect, useRef, useState } from "react";
import BottomSheet from "@wldyslw/react-bottom-sheet";
import AddModal from "./AddModal";
import NewAbout from "./NewAbout";
import useIsMobile from "../hooks/useIsMobile";
import { fetchAbout } from "../services/fetchAbout";

interface BottomSheetRef {
  open: () => void;
  close?: () => void;
}
interface About {
  image: string;
  description: string;
}

const AddAbout = () => {
  const [openModal, setOpenModal] = useState(false);
  const [about, setAbout] = useState<About | null>(null);
  const bottomSheetRef = useRef<BottomSheetRef>(null as unknown as BottomSheetRef);
  const isMobile = useIsMobile();

  const loadAbout = async () => {
    try {
      const data = await fetchAbout();
      setAbout(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAbout();
  }, []);

  const handleAddAbout = () => {
    if (isMobile) {
      bottomSheetRef.current?.open();
    } else {
      setOpenModal(true);
    }
  };

  if (!about) return <></>;

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex justify-end items-end">
        <div className="w-4/12 md:w-2/12" onClick={handleAddAbout}>
          <button className="buttonOfForm cursor-pointer">افزودن</button>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-8">
        <img
          src={about?.image}
          alt="about-us"
          className="rounded-xl xl:rounded-2xl w-full h-72 md:h-96 md:w-6/12"
        />
        <p className="text-[#FAFAFA] leading-7 md:w-6/12 md:leading-9 xl:leading-12 2xl:leading-14">
          {about?.description}
        </p>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="inset-0 absolute backdrop-blur-sm"></div>
          <div className="relative w-6/12 rounded-lg py-8 px-4">
            <AddModal rounded={false}>
              <NewAbout
                title="درباره ما"
                setOpenModal={setOpenModal}
                onSubmitSuccess={loadAbout}
              />
            </AddModal>
          </div>
        </div>
      )}

      <BottomSheet
        detents={["65%"]}
        ref={bottomSheetRef}
        className="!bg-[#171717] text-white w-full py-4 mx-auto"
      >
        <NewAbout
          title="درباره ما "
          buttonSheetClose
          bottomSheetRef={bottomSheetRef}
          onSubmitSuccess={loadAbout}
        />
      </BottomSheet>
    </div>
  );
};

export default AddAbout;
