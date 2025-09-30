import React from "react";

const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-lg text-white ${
        disabled ? " bg-gray-400" : "bg-blue-500"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
