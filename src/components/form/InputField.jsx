import React from "react";

const Input = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,onBlur,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
}) => {
  let inputClasses = ` h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-subtitle-xs placeholder:text-gray-400 focus:outline-hidden ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed opacity-40`;
  } else if (error) {
    inputClasses += `  border-error-500 focus:border-error-300`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-primary-300`;
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
      />
    </div>
  );
};

export default Input;
