import { PropsWithChildren } from "react";

interface FormProps {
  className?: string;
  onSubmit: () => void;
}

export const Form = ({
  children,
  onSubmit,
  className,
}: PropsWithChildren<FormProps>) => {
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
};
