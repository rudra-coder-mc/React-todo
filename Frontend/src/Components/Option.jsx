import { classNames } from "../Util/";

const Options = (prop) => {
  const { title, count, isActive = true, onClick } = prop;
  return (
    <div
      onClick={onClick}
      className={classNames(
        "p-2 hover:bg-zinc-700 text-sm md:text-base transition rounded-md cursor-pointer",
        isActive ? "bg-zinc-700" : ""
      )}
    >
      {title} {count && `(${count})`}
    </div>
  );
};

export default Options;
