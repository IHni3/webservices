import React from "react";
import { Menubar } from "primereact/menubar";

export const StocksMenubar = () => {
  const start = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ fontWeight: 500, fontSize: "20px" }}>Overview</span>
    </div>
  );
  const end = (
    <i
      className={"pi-plus pi"}
      style={{ fontSize: "1.5em", marginRight: "15px" }}
    />
  );

  return (
    <div>
      <div className="card">
        <Menubar id="stocks-menubar" start={start} end={end} />
      </div>
    </div>
  );
};
