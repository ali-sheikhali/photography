import { useFormik } from "formik";
import wideScreenBack from "../assets/wideBackImage.png";
import FormFiled from "../components/FormFiled";
import * as Yup from "yup";
import FormError from "../components/FormError";
import { Link } from "react-router-dom";
import MainLogin from "../components/MainLogin";
import { loginUser } from "../services/authServices";

interface FormValue {
  email: string;
  password: string;
}
function Login() {
 
  const validationSchema = Yup.object({
    email: Yup.string().required("لطفا نام کاربری را وارد کنید."),
    password: Yup.string().required("لطفا رمز را وارد کنید."),
  });
  const formik = useFormik<FormValue>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await loginUser(values.email, values.password);
        window.location.href = "/dashboard";
      } catch (error) {
        console.error("Login Error:", error);  
        alert("رمز را اشتباه وارد کردید.");  
      }
    }
  });
  return (
    <MainLogin>
      <form
        className="flex flex-col gap-10 w-11/12 lg:w-4/12 lg:flex lg:justify-center mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-5">
          <FormFiled
            type="text"
            name="email"
            label="لطفا نام کاربری خود را وارد کنید."
            placeHolder="نام کاربری"
            onBlur={formik.handleBlur}
            formik={formik}
          />
          <FormError title="email" formik={formik} />
          <FormFiled
            type="text"
            name="password"
            label="لطفا رمز خود را وارد کنید."
            placeHolder="رمز"
            onBlur={formik.handleBlur}
            formik={formik}

          />
          <FormError title="password" formik={formik} />
          {/* <Link to="/forget-password">
            <p className="text-[#247D7B] ">فراموشی رمز ورود</p>
          </Link> */}
        </div>
        <button className="buttonOfForm cursor-pointer" type="submit">
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
