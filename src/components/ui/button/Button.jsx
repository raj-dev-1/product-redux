import React from "react";

const Button = ({
  children,
  size = "md",
  variant = "primary",
  onClick,
  className = "", 
  type,
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "px-4 py-3 text-sm", 
    md: "px-5 py-3.5 text-sm",
  };
  const variantClasses = {
    primary:
      "bg-primary-500 text-white shadow-subtitle-xs hover:bg-primary-600 disabled:bg-primary-300",
    outline:
      "bg-white text-gray-700 hover:bg-gray-50 border-2 border-primary-300 hover:text-gray-800",
  };

  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
