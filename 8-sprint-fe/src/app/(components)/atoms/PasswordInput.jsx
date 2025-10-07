"use client";
import React, { useState } from "react";

import visibillity_on from "/public/btn_visibility_on_24px.svg";
import visibillity_off from "/public/btn_visibility_off_24px.svg";
import Image from "next/image";
import TextInput from "./TextInput";

const PasswordInput = ({ name, title, errmessage, isValid, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextInput
      type={isVisible ? "text" : "password"}
      name={name}
      title={title}
      errmessage={errmessage}
      isValid={isValid}
      {...props}
    >
      <button
        type="button"
        onClick={() => setIsVisible((prev) => !prev)}
        className="absolute top-15 right-6 cursor-pointer"
      >
        {isVisible ? (
          <Image src={visibillity_on} alt="visibillity_on" />
        ) : (
          <Image src={visibillity_off} alt="visibillity_off" />
        )}
      </button>
    </TextInput>
  );
};

export default PasswordInput;
