import React from "react";
import { cn } from "../utils/utils";
function Button({
  children,
  className,
  view,
  shop,
  onClick,
  danger,
  edit,
  deleting,
}) {
  return (
    <button
      className={cn(
        "bg-indigo-500 text-white px-4 py-2 hover:scale-110",
        className,
        view &&
          "mt-4  px-4 py-2 rounded hover:bg-indigo-600 transition duration-300",
        shop &&
          "  px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-indigo-700",
        danger && "bg-inherit",
        edit &&
          "bg-blue-600 mt-4  px-4 py-2 rounded hover:bg-blue-800 transition duration-300",
        deleting &&
          "bg-red-500 mt-4 px-4 py-2 rounded hover:bg-blue-800 transition duration-300"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
