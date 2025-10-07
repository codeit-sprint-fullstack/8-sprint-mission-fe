import React from "react";
import { AuthLayout } from "../(components)/Layout";

export default function Authlayout({ children }) {
  return (
    <AuthLayout>
      <div className="max-w-160 w-full min-h-175 flex flex-col items-center justify-center my-12">{children}</div>
    </AuthLayout>
  );
}
