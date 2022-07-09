import { Loader } from "./Loader";
import clsx from "clsx";

interface Props {
  className?: string;
  loading?: boolean;
  text: string;
  onClick?: () => void;
  type?: "submit" | "button";
}

export const Button = ({ className, loading, text, onClick, type }: Props) => {
  const safeClick = () => {
    if (onClick) onClick();
  };

  const mergedClassName = clsx(
    "bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition",
    className
  );

  return (
    <button className={mergedClassName} onClick={safeClick} type={type}>
      {loading ? <Loader /> : text}
    </button>
  );
};
