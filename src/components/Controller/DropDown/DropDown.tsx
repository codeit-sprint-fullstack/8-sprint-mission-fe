"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { DropDownProps, DropDownOption } from "@/types/controller";

const DropDown = ({ options = [], selected, onSelect }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const defaultSelected: DropDownOption = selected || {
    label: "최신순",
    value: "recent",
  };

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:block appearance-none px-4 sm:pr-5 md:pr-6 py-2 border border-gray-200 rounded-xl bg-white text-base text-gray-800 cursor-pointer"
      >
        <div className=" flex items-center self-stretch w-full">
          <span className="mr-3 whitespace-nowrap">
            {defaultSelected.label}
          </span>
          <Image
            src="/ic_DownArrow.svg"
            alt="DropDown Arrow"
            width={20}
            height={20}
            className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2"
          />
        </div>
      </div>

      <div className="sm:hidden gap-[10px] w-[42px] h-[42px] p-[9px] rounded-[12px] border border-gray-200 cursor-pointer">
        <Image src="/ic_sort.svg" alt="Srot icon" width={24} height={24} />
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
