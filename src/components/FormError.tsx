import { FormikErrors, FormikProps } from "formik";
import { T } from "react";

interface Props {
  title: keyof FormikErrors<T>;
  formik: FormikProps<T>; 
}
function FormError({ formik, title }:Props) {
  return (
    <div className="relative">
      {formik.touched[title] && formik.errors[title] ? (
        <div className="text-[12px] text-red-500 absolute -top-4">
          {formik.errors[title]}
        </div>
      ) : null}
    </div>
  );
}

export default FormError;
