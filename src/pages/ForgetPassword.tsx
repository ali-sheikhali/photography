import React from "react";
import MainLogin from "../components/MainLogin";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormFiled from "../components/FormFiled";
import FormError from "../components/FormError";
import wideScreenBack from "../assets/wideBackImage.png";

interface FormValue {
  email: string;
}
function ForgetPassword() {
  const validationSchema = Yup.object({
    email: Yup.string().required("لطفا ایمیل را وارد کنید."),
  });
  const formik = useFormik<FormValue>({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: () => {},
  });
  return (
    <MainLogin>
      <form
        className="flex flex-col gap-10 w-11/12 lg:w-4/12 lg:flex lg:justify-center mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-5">
          <FormFiled
            type="email"
            name="email"
            label="لطفا ایمیل خود را وارد کنید."
            placeHolder="ایمیل"
            onBlur={formik.handleBlur}
          />
          <FormError title="email" formik={formik} />
        </div>
        <button className="buttonOfForm" type="submit">
          ادامه
        </button>
      </form>
      <figure className="hidden lg:block lg:w-6/12">
        <img src={wideScreenBack} alt="wide back" />
      </figure>
    </MainLogin>
  );
}

export default ForgetPassword;
