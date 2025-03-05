import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormFiled from "../FormFiled";
import FormError from "../FormError";
import arrowDown from "../../assets/arrow-down.svg"
interface FormValue {
  name: string;
}
const SuggestForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("لطفا نام و نام خانوادگی را وارد کنید."),
  });
  const formik = useFormik<FormValue>({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: () => {},
  });
  return (
    <form
      className="flex flex-col gap-5 w-11/12 lg:w-8/12 lg:flex lg:justify-center mx-auto"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-5">
        <FormFiled
          type="text"
          name="name"
          placeHolder="نام و نام خانوادگی خود را وارد کنید."
          onBlur={formik.handleBlur}
          label=""
          borderColor="border-[#247D7B]"
        />
        <FormError title="name" formik={formik} />
        <div className="relative w-full">
    <select
      defaultValue="Medium"
      className="appearance-none w-full focus:outline-none text-white border border-[#247D7B] py-2 px-4  rounded-md bg-transparent"
    >
      <option disabled={true} className="text-[#737373]">عکاس خود را انتخاب کنید</option>
      <option className="text-black">علی احمدی</option>
      <option className="text-black">مریم رضایی</option>
      <option className="text-black">سارا موسوی</option>
    </select>
    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
      <img src={arrowDown} alt="" />
    </div>
</div>
        <FormError title="password" formik={formik} />
        <textarea
          className="h-[128px] resize-none border border-[#247D7B] placeholder:text-[#737373] rounded-md px-1 py-2"
          name="description"
          id=""
          placeholder="نظرات و پیشنهادات و یا تجربیات خود را برای ما ارسال کنید."
        ></textarea>
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
