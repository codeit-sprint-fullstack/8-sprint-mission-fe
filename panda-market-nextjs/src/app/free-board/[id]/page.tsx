"use client";

import { useParams } from "next/navigation";

export default function FreeBoardDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>FreeBoardDetailPage</h1>
      <h2>article id : {id}</h2>
    </div>
  );
}
