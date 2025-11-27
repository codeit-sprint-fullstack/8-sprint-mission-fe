"use client";

interface TextareaFieldProps {
  title: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField = ({
  title,
  id,
  placeholder,
  value,
  onChange,
}: TextareaFieldProps) => {
  return (
    <div className="flex flex-col items-start gap-4 w-full mb-8">
      <label htmlFor={id} className="font-semibold text-gray-800">
        {title}
      </label>

      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        minLength={10}
        required
        className="w-full h-[282px] rounded-xl bg-gray-100 px-6 py-4 placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
      />
    </div>
  );
};

export default TextareaField;
