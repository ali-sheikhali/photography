import React from "react";
import closeSquare from "../assets/close-square.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import addSquare from "../assets/add-square.png";
import FormError from "./FormError";
import arrowDown from "../assets/arrow-down.svg";

interface NewPhotoprapherProps {
  setOpenModal?: (value: boolean) => void;
  title: string;
}
interface FormValue {
  image: string;
  name: string;
  photographer: string;
}

const NewPhotoprapher = ({ title, setOpenModal }: NewPhotoprapherProps) => {
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
    onSubmit: (values: FormValue) => {
      console.log("loooog: ", values);
    },
  });
  const handleClick = () => {
    if (setOpenModal) {
      setOpenModal(false);
    }
  };
  const handleChoiceImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newPhoto = URL.createObjectURL(file);
      formik.setFieldValue("image", newPhoto);
      formik.setTouched({ ...formik.touched, image: true });
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
              عکاس خود را انتخاب کنید
            </option>
            <option value="علی احمدی">علی احمدی</option>
            <option value="مریم رضایی">مریم رضایی</option>
            <option value="سارا موسوی">سارا موسوی</option>
          </select>
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <img src={arrowDown} alt="" />
          </div>
        </div>
        <FormError title="photographer" formik={formik} />

        <div className="w-full flex justify-end">
          <button className="buttonOfSuggest" type="submit">
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPhotoprapher;
