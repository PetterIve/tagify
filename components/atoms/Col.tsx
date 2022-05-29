import { PropsWithChildren } from "react";

export const Col = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
  );
};
