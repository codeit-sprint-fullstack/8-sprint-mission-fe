"use client";

const AuthButton = ({ text, onClick, disabled = false }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-full py-3 text-lg font-semibold text-white ${
        disabled
          ? "bg-gray-400 cursor-not-allowed opacity-60"
          : "bg-blue-500 hover:underline cursor-pointer"
      }`}
    >
      {text}
    </button>
  );
};

export default AuthButton;
