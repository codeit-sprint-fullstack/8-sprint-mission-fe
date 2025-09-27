import Image from "next/image";
import React from "react";

import ic_profile from "/public/ic_profile.svg";

const ProfileIcon = ({ img, size = "24" }) => {
  const imgSrc = img ? img : ic_profile;
  return (
    <Image
      src={imgSrc}
      alt="profile_icon"
      width={size}
      height={size}
      className="bg-gray-400 rounded-full"
    />
  );
};

export default ProfileIcon;
