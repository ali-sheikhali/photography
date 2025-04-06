interface FormFiledProps {
  type: string;
  label: string;
  placeHolder: string;
  name:string;
  borderColor?:string,
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formik: any;
}

function FormFiled({ type, label, name, placeHolder, borderColor, onBlur, formik }: FormFiledProps) {
  return (
    <div className="flex flex-col gap-2 text-white font-bold">
      <label htmlFor={name}>{label ? label : ""}</label>
      <input
        id={name}
        name={name}
        type={type}
        className={`border ${borderColor ? borderColor : "border-[#292524]"} py-2 px-3 focus:outline-none placeholder:text-[#737373] rounded-md`}
        placeholder={placeHolder}
        onBlur={onBlur}
        onChange={formik.handleChange}
        value={formik.values[name]}
      />
    </div>
  );
}

export default FormFiled;
