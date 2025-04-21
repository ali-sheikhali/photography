import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormError from "../FormError";
import arrowDown from "../../assets/arrow-down.svg";
import { fetchPhotographer } from "../../services/fetchPhotoprapher";
import { submitComment } from "../../services/commentServices";

interface FormValue {
  name: string;
  text: string;
  photographerId: string;
}
interface Photographer {
  name: string;
  id: number;
  image: string;
}
const SuggestForm = () => {
  const [photographer, setPhotographer] = useState<Photographer[]>([]);
  const validationSchema = Yup.object({
    name: Yup.string().required("لطفا نام و نام خانوادگی را وارد کنید."),
    text: Yup.string().required("لطفا نظر خود را وارد کنید."),
    photographerId: Yup.string().required("لطفا یک عکاس را انتخاب کنید."),
  });

  const formik = useFormik<FormValue>({
    initialValues: {
      name: "",
      text: "",
      photographerId: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = {
        text: values.text,
        name: values.name,
        photographerId: values.photographerId,
      };
      try {
        await submitComment(formData);
        console.log("data submitted");
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    const loadPhotographer = async () => {
      try {
        const data = await fetchPhotographer();
        setPhotographer(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadPhotographer();
  }, []);

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
          className="border-[#247D7B] border py-2 px-3 focus:outline-none text-white placeholder:text-[#737373] rounded-md"
        />
        <FormError title="name" formik={formik} />
        <div className="relative w-full">
          <select
            name="photographerId"
            value={formik.values.photographerId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`appearance-none w-full focus:outline-none border border-[#247D7B] py-2 px-4 rounded-md bg-transparent 
            ${formik.values.photographerId ? "text-white" : "text-[#737373]"}`}
          >
            <option value="" disabled className="text-[#737373]">
              عکاس خود را انتخاب کنید
            </option>
            {photographer.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <img src={arrowDown} alt="" />
          </div>
        </div>
        <FormError title="photographerId" formik={formik} />
        <textarea
          className="h-[128px] resize-none focus:outline-none text-white font-bold border border-[#247D7B] placeholder:text-[#737373] rounded-md px-1 py-2"
          name="text"
          value={formik.values.text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="نظرات و پیشنهادات و یا تجربیات خود را برای ما ارسال کنید."
        ></textarea>
        <FormError title="text" formik={formik} />
      </div>
      <div className="flex justify-end">
        <button className="buttonOfSuggest cursor-pointer" type="submit">
          ارسال
        </button>
      </div>
    </form>
  );
};

export default SuggestForm;
