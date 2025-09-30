"use client";

export default function WriteField({
    id,
    label,
    required,
    type = "text",
    value,
    onChange,
    placeholder,
    textarea = false,
}) {
    return (
        <div className={textarea ? "" : "mb-8"}>
            <label
                htmlFor={id}
                className="block text-lg font-semibold text-gray-700 mb-2"
            >
                {required && <span className="text-red-500 mr-1">*</span>}
                {label}
            </label>
            {textarea ? (
                <textarea
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 h-72 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                />
            )}
        </div>
    );
}
