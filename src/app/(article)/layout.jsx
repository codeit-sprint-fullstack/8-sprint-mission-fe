import { DefaultLayout } from "@/components/Layout";
import React from "react";

export default async function Layout({children}) {
  return (
    <DefaultLayout>{children}</DefaultLayout>
  );
}