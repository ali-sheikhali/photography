import React from "react";
import FormError from "./FormError";
import * as Yup from "yup";
import { useFormik } from "formik";
import { submitChangePassword } from "../services/changePassword";
import closeSquare from "../assets/close-square.svg";

interface FormValue {
  password: string;
}
interface changePasswordProps {
  setOpenModal?: (value: boolean) => void;
  bottomSheetRef?: React.RefObject<{ close?: () => void }>;
  title: string;
}
const ChangePassword = ({
  setOpenModal,
  bottomSheetRef,
  title,
}: changePasswordProps) => {
  const validationSchema = Yup.object({
    password: Yup.string().required("لطفا رمز را وارد کنید"),
  });

  const formik = useFormik<FormValue>({
    initialValues: {
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("pass: ", values);

      const password = values.password;
      try {
        await submitChangePassword({ password: password });
        console.log("password changed");

        if (setOpenModal) {
          setOpenModal(false);
        } else {
          bottomSheetRef?.current?.close?.();
        }
      } catch (error) {
        console.error(error);
        console.log("not");
      }
    },
  });
  const handleClick = () => {
    if (setOpenModal) {
      setOpenModal(false);
    }
    bottomSheetRef?.current?.close?.();
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
        <input
          type="text"
          name="password"
          placeholder="رمز جدید را وارد کنید."
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border-[#247D7B] border py-2 px-3 focus:outline-none placeholder:text-[#737373] rounded-md"
        />
        <FormError title="password" formik={formik} />

        <div className="w-full flex justify-end ">
          <button className="buttonOfSuggest cursor-pointer" type="submit">
            ذخیره
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
