import React from "react";
import { cn } from "../utils/utils";

function H({ children, className, one, two, three, four, five, register }) {
  return (
    <h1
      className={cn(
        " font-bold text-violet-950 mb-4 text-center",
        className,
        one && "text-6xl",
        two && "text-5xl",
        three && "text-4xl",
        four && "text-3xl",
        five && "text-2xl",
        register && "mb-0 text-left"
      )}
    >
      {children}
    </h1>
  );
}

export default H;
