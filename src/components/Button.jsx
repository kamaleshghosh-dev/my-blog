import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-indigo-600",
  hoverColor = "hover:bg-indigo-700",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md text-sm font-medium ${bgColor} ${hoverColor} ${textColor} transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}