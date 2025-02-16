import { FormikErrors, FormikProps } from "formik";
interface props {
  title: keyof FormikErrors<T>;
  formik: FormikProps<T>; 
}
function FormError({ formik, title }:props) {
  return (
    <div className="relative">
      {formik.touched[title] && formik.errors[title] ? (
        <div className="text-[12px] text-red-500 absolute -top-10">
          {formik.errors[title]}
        </div>
      ) : null}
    </div>
  );
}

export default FormError;
