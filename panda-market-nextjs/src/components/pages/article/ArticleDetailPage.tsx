"use client";

import { useParams } from "next/navigation";

export default function ArticleDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>ArticleDetailPage</h1>
      <h2>article id : {id}</h2>
    </div>
  );
}
