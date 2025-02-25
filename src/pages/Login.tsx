import { useFormik } from "formik";
import wideScreenBack from "../assets/wideBackImage.png";
import FormFiled from "../components/FormFiled";
import * as Yup from "yup";
import FormError from "../components/FormError";
import { Link } from "react-router-dom";
import MainLogin from "../components/MainLogin";

interface FormValue {
  email: string;
  password: string;
}
function Login() {
  const validationSchema = Yup.object({
    email: Yup.string().required("لطفا ایمیل را وارد کنید."),
    password: Yup.string().required("لطفا رمز را وارد کنید."),
  });
  const formik = useFormik<FormValue>({
    initialValues: {
      email: "",
      password: "",
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
          <FormFiled
            type="text"
            name="password"
            label="لطفا رمز خود را وارد کنید."
            placeHolder="رمز"
            onBlur={formik.handleBlur}

          />
          <FormError title="password" formik={formik} />
          <Link to="/forget-password">
            <p className="text-[#247D7B] ">فراموشی رمز ورود</p>
          </Link>
        </div>
        <button className="buttonOfForm" type="submit">
         ورود
        </button>
      </form>
      <figure className="hidden lg:block lg:w-6/12">
        <img src={wideScreenBack} alt="wide back" />
      </figure>
      </MainLogin>

  );
}

export default Login;
