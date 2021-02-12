import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";

export const LoginMenubar = () => {
  const start = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ fontWeight: 700, fontSize: "25px" }}>StoXX</span>
    </div>
  );
  const end = <InputText placeholder="Search" type="text" />;

  return (
    <div>
      <div className="card">
        <Menubar id="stocks-menubar" start={start} />
      </div>
    </div>
  );
};
