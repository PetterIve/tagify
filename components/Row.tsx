import { PropsWithChildren } from "react";

export const Row = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>{children}</div>
  );
};
