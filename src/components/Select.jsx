import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-indigo-400"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        {...props}
        className={`w-full px-4 py-2 rounded-md bg-slate-800 text-gray-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${className}`}
      >
        {options?.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-slate-900 text-gray-100"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
