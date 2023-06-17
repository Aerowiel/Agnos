import { ReactNode } from "react";

const GenericLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="generic-layout">
      <div className="generic-layout__content">{children}</div>
    </div>
  );
};

export default GenericLayout;
