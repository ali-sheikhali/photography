interface FormFiledProps {
  type: string;
  label: string;
  placeHolder: string;
  name:string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
function FormFiled({ type, label,name, placeHolder, onBlur }: FormFiledProps) {
  return (
    <div className="flex flex-col gap-2 text-white font-bold">
      <label htmlFor="input">{label}</label>
      <input
        id="input"
        name={name}
        type={type}
        className="border border-[#292524] py-2 px-3 focus:outline-none placeholder:text-[#737373] rounded-md"
        placeholder={placeHolder}
        onBlur={onBlur}
      />
      
    </div>
  );
}

export default FormFiled;
