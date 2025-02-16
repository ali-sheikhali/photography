import { useEffect, useState } from "react";
import { useFormik } from "formik";
import mobileBack from "../assets/halftone-monochrome-collage1.jpg";
import wideScreenBack from "../assets/wideBackImage.png";
import FormFiled from "../components/FormFiled";
import * as Yup from "yup";
import FormError from "../components/FormError";
import { useResponsiveBg } from "../hooks/useResponsiveBg";

interface FormValue {
  phone: string;
}
function Login() {
  const bgImage = useResponsiveBg(mobileBack);

  const validationSchema = Yup.object({
    phone: Yup.string().required("لطفا موبایل را وارد کنید."),
  });
  const formik = useFormik<FormValue>({
    initialValues: {
      phone: "",
    },
    validationSchema,
    onSubmit: () => {},
  });
  return (
    <>
      <main
        className="h-screen bg-no-repeat bg-cover flex justify-center items-center md:bg-none"
        style={{ backgroundImage: bgImage ? `url(${mobileBack})` : "none" }}
      >
        <div
          className={`absolute inset-0 ${
            bgImage ? "bg-[#1D1818]" : "bg-none"
          } opacity-80`}
        ></div>
        <div className="bg-[#171717] lg:bg-gradient-to-l from-80%  from-[#171717] to-[#145453]
         w-11/12 lg:w-full lg:h-screen lg:rounded-none lg:flex  mx-auto z-50 py-20 rounded-lg">
          <form
            className="flex flex-col gap-12 w-11/12 lg:w-4/12 lg:flex lg:justify-center mx-auto"
            onSubmit={formik.handleSubmit}
          >
            <FormFiled
              type="text"
              name="phone"
              label="لطفا شماره موبایل خود را وارد کنید."
              placeHolder="شماره همراه را وارد کنید."
            />
            <FormError title="phone" formik={formik} />
            <button className="buttonOfForm" type="submit">
              تایید و ادامه
            </button>
          </form>
          <figure className="hidden lg:block lg:w-6/12">
            <img src={wideScreenBack} alt="wide back" />
          </figure>
        </div>
      </main>
    </>
  );
}

export default Login;
