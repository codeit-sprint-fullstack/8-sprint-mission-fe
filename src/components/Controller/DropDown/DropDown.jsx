"use client";

import Image from "next/image";

const DropDown = ({ options = [], selected, onSelect }) => {
  return (
    <div className="relative w-[130px] py-3 px-4">
      <div>
        <select
          value={selected.value}
          onChange={(e) => {
            const opt = options.find((o) => o.value === e.target.value);
            onSelect(opt);
          }}
          className="appearance-none px-4 sm:px-5 md:px-6 py-2 border border-gray-200 rounded-xl bg-white text-base text-gray-800 cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
          <Image
            src="/ic_DownArrow.svg"
            alt="DropDownArrow"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default DropDown;
