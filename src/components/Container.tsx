import React from "react";
import "./Container.css";

export function Container({ children }: { children: React.ReactElement }) {
  return (
    <div className="container-wrapper">
      <div className="container">{children}</div>
    </div>
  );
}
