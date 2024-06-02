import { forwardRef } from "react";
import { classNames } from "../Util";

const Input = (prop, ref) => (
  <input
    {...prop}
    ref={ref}
    className={classNames(
      "bg-transparent rounded-xl outline-none border-[1px] px-5 py-3 text-base md:text-lg focus:border-purple-500 border-white",
      prop.className || ""
    )}
  />
);

export default forwardRef(Input);
