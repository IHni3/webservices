import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";

export const SingleStockMenubar = () => {
  const items = [
    {
      label: "File",
      icon: "pi pi-fw pi-file",
    },
    {
      label: "Quit",
      icon: "pi pi-fw pi-power-off",
    },
  ];

  const start = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <a href="/stocks" className="nolink">
        <i
          className={"pi-angle-left pi"}
          style={{ fontSize: "1.5em", marginRight: "15px" }}
        />
        <span style={{ fontWeight: 500, fontSize: "20px" }}>
          iShares MSCI World (Acc)
        </span>
      </a>
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
