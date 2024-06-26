import React from "react";
import { cn } from "../utils/utils";
import PropTypes from "prop-types";
function Button({ children, className, view, shop, onClick }) {
  return (
    <button
      className={cn(
        "bg-indigo-500 text-white",
        className,
        view &&
          "mt-4 inline-block px-4 py-2 rounded hover:bg-indigo-600 transition duration-300",
        shop &&
          "  px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-indigo-700"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  view: false,
  shop: false,
  onClick: null,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  view: PropTypes.bool,
  shop: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
