import { ReactNode } from "react";
interface AddModal {
  rounded: boolean;
  children: ReactNode; 
}
const AddModal = ({ rounded , children  }: AddModal) => {
 
  return (
    <>
      <div
        className={`flex flex-col h-full mx-auto w-full py-4 backdrop-blur-2xl bg-[#171717] ${
          rounded ? "rounded-none" : "rounded-2xl"
        } `}
      >
        <div className="w-11/12 mx-auto flex flex-col gap-5">
            {children}
        </div>
      </div>
    </>
  );
};

export default AddModal;
