import ActionDropdown from "@/components/ActionDropdown";
import Image from "next/image";
import React from "react";

const Item = ({ data }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div>{data.content}</div>
        <ActionDropdown />
      </div>
      <div className="flex gap-2">
        <div>
          <Image src={data.profile} alt="writer image" width={40} height={40} />
        </div>
        <div>
          <div>{data.author}</div>
          <div>{data.createdAt}</div>
        </div>
      </div>
    </div>
  );
};

export default Item;
