import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
  { label, type = 'text', className = '', ...props },
  ref
) {
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
      <input
        type={type}
        id={id}
        ref={ref}
        className={`w-full px-4 py-2 rounded-md text-sm bg-slate-800 text-gray-100 placeholder-gray-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;