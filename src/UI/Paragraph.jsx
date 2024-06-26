import React from "react";
import { cn } from "../utils/utils";

function Paragraph({ children, className }) {
  return <p className={cn("text-2xl", className)}>{children}</p>;
}

export default Paragraph;
