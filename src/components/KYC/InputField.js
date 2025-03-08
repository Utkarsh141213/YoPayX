const InputField = ({ type = "text", name, placeholder, value, onChange, ...rest }) => {
  return (
    <div className="KYC-input mb-3">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-green-500 text-black"
        required
        {...rest}
      />
    </div>
  );
};

export default InputField;
