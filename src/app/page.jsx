import Link from "next/link";
import React from "react";

const homepage = () => {
  return (
    <div>
      <Link href={"/board"}>자유게시판</Link>
    </div>
  );
};

export default homepage;
