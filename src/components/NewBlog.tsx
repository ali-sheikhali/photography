import React, { useState } from "react";
import closeSquare from "../assets/close-square.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import addSquare from "../assets/add-square.png";
import FormError from "./FormError";
import { uploadImage } from "../services/uploadPhotographer";
import { submitBlog } from "../services/blogServices";
interface NewBlogProps {
  setOpenModal?: (value: boolean) => void;
  title: string;
  bottomSheetRef?: React.RefObject<{ close?: () => void }>;
  onBlogAdded?: (blog: FormValue) => void;
}
interface FormValue {
  title: string;
  image: string;
  description: string;
}
const NewBlog = ({
  title,
  setOpenModal,
  bottomSheetRef,
  onBlogAdded,
}: NewBlogProps) => {
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  const handleClick = () => {
    if (setOpenModal) {
      setOpenModal(false);
    }
    bottomSheetRef?.current?.close?.();
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("لطفا تایتل را وارد کنید"),
    description: Yup.string().required("لطفا توضیحات را وارد کنید"),
    image: Yup.string().required("لطفا عکس را وارد کنید"),
  });
  const formik = useFormik<FormValue>({
    initialValues: {
      title: "",
      image: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("values: ", values);
      const formData = {
        image: values.image,
        title: values.title,
        description: values.description,
      };
      try {
        const response = await submitBlog(formData);
        if (onBlogAdded) {
          onBlogAdded(response);
        }
        if (setOpenModal) {
          setOpenModal(false);
        } else {
          bottomSheetRef?.current?.close?.();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  const handleChoiceImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(true)
      try {
        const uploadedImage = await uploadImage(file);
        formik.setFieldValue("image", uploadedImage.url);
        setUploadingImage(false)
      } catch (error) {
        console.error(error);
        setUploadingImage(false)
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
              <p>{uploadingImage ? "در حال بارگذاری" : "بارگزاری عکس"}</p>
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
          name="title"
          placeholder="تایتل را وارد کنید"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border-[#247D7B] border py-2 px-3 focus:outline-none placeholder:text-[#737373] rounded-md"
        />
        <FormError title="title" formik={formik} />
        <textarea
          className="h-[128px] resize-none focus:outline-none text-white font-bold border border-[#247D7B] placeholder:text-[#737373] rounded-md px-1 py-2"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="متن بلاگ را وارد کنید."
        ></textarea>
        <FormError title="description" formik={formik} />
        <div className="w-full flex justify-end ">
          <button className="buttonOfSuggest cursor-pointer" type="submit">
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBlog;
