// interface InputsTypes {
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   streetAddress: string;
//   state: string;
//   postalCode: string;
// }
function CustomInput({
  placeholder,
  label,
  additionalclass,
  type,
  handleInput,
  handleBlur,
  name,
  value,
  InputRef,
  err_msg,
}: {
  placeholder?: string;
  label?: string;
  additionalclass?: string;
  type?: string;
  handleInput?: any;
  handleBlur?: any;
  name?: any;
  value?: any;
  InputRef?: React.RefObject<HTMLInputElement>;
  err_msg?: React.ReactNode;
}) {
  // const { inputErr } = useContext(ContextApi);
  return (
    <>
      <div className="w-full">
        <label className="text-xs font-medium">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          className={`w-full py-3 px-2 outline-0 rounded-lg text-sm surface surface-text focus:border focus:border-pink-700  ${additionalclass}`}
          // onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInput}
          ref={InputRef}
        />
        <p className="text-xs text-red-600 ">{err_msg}</p>
      </div>
    </>
  );
}

export default CustomInput;
