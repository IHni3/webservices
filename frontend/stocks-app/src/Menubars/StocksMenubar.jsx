import React from "react";
import { Menubar } from "primereact/menubar";

export const StocksMenubar = ({ onAddClicked, onLogoutClicked }) => {
  const start = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ fontWeight: 500, fontSize: "20px" }}>Overview</span>
    </div>
  );
  const end = (
    <div className={"flex-row"} >
      <i
        className={"pi-plus pi"}
        style={{ fontSize: "1.5em", marginRight: "10px", cursor: "pointer" }}
        onClick={(e) => onAddClicked(e)}
      />

      <i
        className={"pi-sign-out pi"}
        style={{ fontSize: "1.5em", marginRight: "20px", cursor: "pointer" }}
        onClick={(e) => onLogoutClicked(e)}
      />
    </div>
  );

  return (
    <div>
      <div className="card">
        <Menubar id="stocks-menubar" start={start} end={end} />
      </div>
    </div>
  );
};
