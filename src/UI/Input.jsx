import React from "react";
import { cn } from "../utils/utils";

function Input({
  className,
  type,
  name,
  value,
  onChange,
  placeholder,
  search,
}) {
  return (
    <input
      className={cn(
        "rounded-md p-1",
        className,
        search &&
          "border border-gray-300 p-3 rounded-l-full w-full focus:outline-none"
      )}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
