import React, { forwardRef } from "react";
import classNames from "../Util/index";

// Define the props for the Input component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Explicitly define className if needed
  className?: string;
}

// Define the Input component using forwardRef
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }: InputProps, ref) => (
    <input
      {...props}
      ref={ref}
      className={classNames(
        "bg-transparent rounded-xl outline-none border-[1px] px-5 py-3 text-base md:text-lg focus:border-purple-500 border-white",
        className || "",
      )}
    />
  ),
);

// Set a display name for better debugging
Input.displayName = "Input";

// Export the named Input component directly
export default Input;
