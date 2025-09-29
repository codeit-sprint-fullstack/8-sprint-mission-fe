"use client";

const AuthButton = ({ text, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-full bg-gray-400 py-3 text-lg font-semibold text-white cursor-pointer hover:bg-blue-500"
    >
      {text}
    </button>
  );
};

export default AuthButton;
