// import React from "react";
// import { cn } from "../utils/utils";

// function Input({
//   className,
//   type,
//   name,
//   value,
//   onChange,
//   placeholder,
//   search,
//   register,
//   ref,
// }) {
//   return (
//     <input
//       className={cn(
//         "rounded-md p-1 focus:border-violet-600",
//         className,
//         search &&
//           "border border-gray-300 p-3 rounded-l-full w-full focus:outline-none",
//         register &&
//           "border border-gray-300 p-1 rounded-r-full w-full focus:outline-none"
//       )}
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       ref={ref}
//     />
//   );
// }

// export default React.forwardRef((props, ref) => <Input {...props} ref={ref} />);

import React from "react";
import { cn } from "../utils/utils";

const Input = React.forwardRef(
  (
    { className, type, name, value, onChange, placeholder, search, register },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={cn(
          "rounded-md p-1 focus:border-violet-600",
          className,
          search &&
            "border border-gray-300 p-3 rounded-l-full w-full focus:outline-none",
          register &&
            "border border-gray-300 p-1 rounded-r-full w-full focus:outline-none"
        )}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
);

export default Input;
