import React from "react";

export const Input = ({ placeholder, name, onChange, value, label, type }) => {
  return (
    <div className="flex flex-col border p-2">
      <label htmlFor={name} className="self-start">
        {label}
      </label>
      <input
        type={type ?? "text"}
        id={name}
        name={name}
        placeholder={placeholder}
        className="outline-none text-[13px]"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
