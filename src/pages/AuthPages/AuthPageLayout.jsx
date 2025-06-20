import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="relative p-6 bg-white z-1 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row sm:p-0">
        {children}
      </div>
    </div>
  );
}
