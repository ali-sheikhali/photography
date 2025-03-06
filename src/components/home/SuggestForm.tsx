import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormError from "../FormError";
import arrowDown from "../../assets/arrow-down.svg";

interface FormValue {
  name: string;
  description: string;
  photographer: string;
}

const SuggestForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("لطفا نام و نام خانوادگی را وارد کنید."),
    description: Yup.string().required("لطفا نظر خود را وارد کنید."),
    photographer: Yup.string().required("لطفا یک عکاس را انتخاب کنید."),
  });

  const formik = useFormik<FormValue>({
    initialValues: {
      name: "",
      description: "",
      photographer: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted! Values:", values);
    },
  });

  return (
    <form
      className="flex flex-col gap-5 w-11/12 lg:w-8/12 lg:flex lg:justify-center mx-auto"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-5">
        <input
          type="text"
          name="name"
          placeholder="نام و نام خانوادگی خود را وارد کنید."
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
            ${formik.values.photographer ? "text-white" : "text-[#737373]"}`}
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
        <textarea
          className="h-[128px] resize-none focus:outline-none text-white font-bold border border-[#247D7B] placeholder:text-[#737373] rounded-md px-1 py-2"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="نظرات و پیشنهادات و یا تجربیات خود را برای ما ارسال کنید."
        ></textarea>
        <FormError title="description" formik={formik} />
      </div>
      <div className="flex justify-end">
        <button className="buttonOfSuggest" type="submit">
          ارسال
        </button>
      </div>
    </form>
  );
};

export default SuggestForm;
