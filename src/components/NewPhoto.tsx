import React, { useEffect, useState } from "react";
import closeSquare from "../assets/close-square.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import addSquare from "../assets/add-square.png";
import FormError from "./FormError";
import arrowDown from "../assets/arrow-down.svg";
import { fetchPhotographer } from "../services/fetchPhotoprapher";
import { uploadImage } from "../services/uploadPhotographer";
import { submitPhoto } from "../services/photoServices";
import { fetchPhoto } from "../services/fetchPhoto";

interface NewPhotoprapherProps {
  setOpenModal?: (value: boolean) => void;
  bottomSheetRef?: React.RefObject<{ close?: () => void }>;
  title: string;
  onPhotoAdded?: (photographer: Photographer) => void;

}
interface FormValue {
  image: string;
  genre: string;
  photographer: string;
}
interface Photographer {
  id: string;
  name: string;
  image: string;
  genre: string;
}
const NewPhoto = ({
  title,
  setOpenModal,
  bottomSheetRef,
  onPhotoAdded
}: NewPhotoprapherProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);

  useEffect(() => {
    const loadPhotographer = async () => {
      try {
        const data = await fetchPhotographer();
        setPhotographers(data);
      } catch (error) {
        console.error("خطا در دریافت لیست عکاسان:", error);
      }
    };
    loadPhotographer();
  }, []);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
         await fetchPhoto();
      } catch (error) {
        console.error("خطا در دریافت عکس‌ها:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, []);
  const validationSchema = Yup.object({
    image: Yup.mixed().required("عکس را وارد کنید."),
    genre: Yup.string().required("نوع را وارد کنید."),
    photographer: Yup.string().required("عکاس را انتخاب کنید."),
  });
  const formik = useFormik<FormValue>({
    initialValues: {
      image: "",
      genre: "",
      photographer: "",
    },
    validationSchema,
    onSubmit: async (values: FormValue) => {
      const formattedValues = {
        url: values.image.url,
        type: values.genre,
        photographerId: values.photographer,
      };
      
      try {
         const newPhoto = await submitPhoto(formattedValues);
       
         if(onPhotoAdded){
          onPhotoAdded(newPhoto)
         }
        if(setOpenModal){
          setOpenModal(false)
        }else{
          bottomSheetRef?.current?.close?.();
        }
      } catch (error) {
        alert("مشکلی در ارسال عکس به وجود آمد.");
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
      try {
        const uploadedImage = await uploadImage(file);
        formik.setFieldValue("image", uploadedImage);
      } catch (error) {
        alert(error.message);
      }
    }
  };
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
        <div className="relative w-full">
          <select
            name="genre"
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`appearance-none w-full focus:outline-none border border-[#247D7B] py-2 px-4 rounded-md bg-transparent 
                    ${formik.values.genre ? "text-white" : "text-[#737373]"}`}
          >
            <option value="" disabled className="text-[#737373]">
              دسته بندی عکس
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
        <FormError title="genre" formik={formik} />
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
              عکاس خود را انتخاب کنید
            </option>
            {photographers.map((photographer) => (
              <option key={photographer.id} value={photographer.id}>
                {photographer.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <img src={arrowDown} alt="" />
          </div>
        </div>
        <FormError title="photographer" formik={formik} />

        <div className="w-full flex justify-end">
          <button className="buttonOfSuggest cursor-pointer" type="submit">
            ثبت
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPhoto;
