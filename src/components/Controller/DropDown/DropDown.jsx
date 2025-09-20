"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const DropDown = ({ options = [], selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const defaultSelected = selected || { label: "최신순", value: "latest" };

  return (
    <div className="relative w-[130px]" ref={menuRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="appearance-none px-4 sm:px-5 md:px-6 py-2 border border-gray-200 rounded-xl bg-white text-base text-gray-800 cursor-pointer"
      >
        <div className=" flex items-center self-stretch w-full gap-2">
          <span className="text-nowrap">{defaultSelected.label}</span>
          <Image
            src="/ic_DownArrow.svg"
            alt="DropDown Arrow"
            width={20}
            height={20}
            className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2"
          />
        </div>
      </div>

      {isOpen && (
        <ul className="absolute top-full left-0 w-full mt-1 border border-gray-200 rounded-xl bg-white z-50">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onSelect(opt);
                setIsOpen(false);
              }}
              className="flex justify-center items-start px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
