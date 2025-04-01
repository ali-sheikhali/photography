import React from "react";
import closeSquare from "../assets/close-square.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import addSquare from "../assets/add-square.png";
import FormError from "./FormError";
import arrowDown from "../assets/arrow-down.svg";
import { uploadImage } from "../services/uploadPhotographer";
import { submitPhotographer } from "../services/photographerServices";

interface NewPhotoprapherProps {
  setOpenModal?: (value: boolean) => void;
  title: string;
    bottomSheetRef?: React.RefObject<{ close?: () => void }>;
  
}
interface FormValue {
  image: string;
  name: string;
  photographer: string;
}

const NewPhotoprapher = ({ title, setOpenModal ,bottomSheetRef }: NewPhotoprapherProps) => {


  const validationSchema = Yup.object({
    image: Yup.mixed().required("عکس را وارد کنید."),
    name: Yup.string().required("نام را وارد کنید."),
    photographer: Yup.string().required("عکاس را انتخاب کنید."),
  });
  const formik = useFormik<FormValue>({
    initialValues: {
      image: "",
      name: "",
      photographer: "",
    },
    validationSchema,
    onSubmit:async (values: FormValue) => {
      const formattedValues = {
        image: values.image.url, 
        name: values.name,
        genre: values.photographer, 
      };
    
      console.log("Final Form Data:", formattedValues);
      try{

        await submitPhotographer(formattedValues)
        alert("ok")
      }catch(error){
        alert(error.message)
      }
      
    },
  });
  const handleClick = () => {
    if (setOpenModal) {
      setOpenModal(false);
    }
    bottomSheetRef?.current?.close?.();
  };
  const handleChoiceImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

      try{
        const uploadedImage = await uploadImage(file)
        formik.setFieldValue("image" , uploadedImage)
      }catch(error){
        alert("آپلود تصویر با خطا مواجه شد")
      }
  };
}
  return (
    <div className="flex flex-col gap-8 w-11/12 mx-auto ">
      <div className="flex items-center justify-between">
        <p>{title}</p>
        <img
          className="cursor-pointer"
          onClick={handleClick}
          src={closeSquare}
          alt="close-square"
        />
      </div>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div>
          {formik.values.image ? (
            <img
              src={formik.values.image}
              alt="Uploaded"
              className="h-[14rem] md:h-[17rem] w-full object-cover rounded-lg"
            />
          ) : (
            <label
              htmlFor="upload-file"
              className="h-[14rem] md:h-[17rem] px-4 py-2 border border-dashed  flex flex-col items-center justify-center rounded-lg gap-2 cursor-pointer"
            >
              <img src={addSquare} alt="add" />
              <p>بارگزاری عکس</p>
            </label>
          )}

          <input
            type="file"
            accept="image/*"
            id="upload-file"
            className="hidden"
            onChange={handleChoiceImage}
            onBlur={formik.handleBlur}
          />
        </div>
        <FormError title="image" formik={formik} />

        <input
          type="text"
          name="name"
          placeholder="نام عکاس"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border-[#247D7B] border py-2 px-3 focus:outline-none placeholder:text-[#737373] rounded-md"
        />
        <FormError title="name" formik={formik} />
        <div className="relative w-full">
          <select
            name="photographer"
            value={formik.values.photographer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`appearance-none w-full focus:outline-none border border-[#247D7B] py-2 px-4 rounded-md bg-transparent 
                    ${
                      formik.values.photographer
                        ? "text-white"
                        : "text-[#737373]"
                    }`}
          >
            <option value="" disabled className="text-[#737373]">
              دسته بندی خود را انتخاب کنید
            </option>
            <option value="nature">طبیعت</option>
            <option value="street">خیابانی</option>
            <option value="abstract">انتزاعی</option>
            <option value="light">نور</option>
            <option value="documentary">مستند</option>
          </select>
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <img src={arrowDown} alt="" />
          </div>
        </div>
        <FormError title="photographer" formik={formik} />

        <div className="w-full flex justify-end ">
          <button className="buttonOfSuggest cursor-pointer" type="submit">
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPhotoprapher;
