import React from "react";
import { cn } from "../utils/utils";

function Modal({ children, className, success, error }) {
  return (
    <div
      className={cn(
        "rounded-md fixed right-2 bottom-2 text-gray-100 p-4 text-2xl",
        className,
        success && "bg-green-600",
        error && "bg-red-700"
      )}
    >
      {children}
    </div>
  );
}

export default Modal;
