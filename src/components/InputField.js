import React from "react";

function InputField({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input-field"
      value={value} // Controlled value
      onChange={onChange} // Update state on input change
    />
  );
}

export default InputField;
