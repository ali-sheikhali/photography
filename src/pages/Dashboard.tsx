import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import * as Yup from "yup";
import { useFormik } from "formik";
import addSquare from "../assets/add-square.png";
import trash from "../assets/trash.png";

interface FormValue {
  text: string;
}
function Dashboard() {
  const [image, setImage] = useState<string[]>([]);

  const validationSchema = Yup.object({
    text: Yup.string().required(),
  });
  const formik = useFormik<FormValue>({
    initialValues: {
      text: "",
    },
    validationSchema,
    onSubmit: (values: FormValue) => {
      console.log("loooog: ", values);
    },
  });

  const handleChoiceImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImage = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImage((imagePrev) => [...imagePrev, ...newImage]);
    }
  };
  const handleDelete = (index: number) => {
    setImage((imagePrev) => imagePrev.filter((_, i) => i !== index));
  };
  return (
    <>
      <NavBar />
      <main className="bg-[#1D1818] text-white w-full ">
        <div className="w-11/12 mx-auto flex flex-col gap-12 md:gap-24 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <form>
              <label
                htmlFor="upload-file"
                className="h-[17rem] md:h-[24rem] px-4 py-2 border border-dashed  flex items-center justify-center rounded-lg gap-2 cursor-pointer"
              >
                <img src={addSquare} alt="add" />
              </label>
              <input
                type="file"
                accept="image/*"
                id="upload-file"
                className="hidden"
                onChange={handleChoiceImage}
              />
            </form>
            {image.map((img, index) => (
              <div className=" rounded-lg h-[17rem] md:h-[24rem]">
                <div key={index} className="relative w-full h-full">
                  <img
                    src={img}
                    alt="image"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    className="absolute left-2 bottom-2 cursor-pointer "
                    onClick={() => handleDelete(index)}
                  >
                    <img src={trash} alt="trash" className="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full h-[28rem] md:h-[22rem] relative"
          >
            <textarea
              placeholder="متن مورد نظر خود را وارد کنید."
              className="w-full resize-none h-full border border-[#737373] py-2 px-3 focus:outline-none placeholder:text-[#737373] rounded-md"
              name="text"
              id=""
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.text}
            ></textarea>
            <div className="w-4/12 md:w-2/12 mx-auto absolute flex justify-center items-center bottom-3 left-1/2 -translate-x-1/2">
              <button type="submit" className="buttonOfForm">
                ثبت
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;
