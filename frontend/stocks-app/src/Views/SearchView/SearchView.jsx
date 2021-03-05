import React, { useState } from "react";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";

import "./style.scss";

export const SearchView = ({ visible, onSubmit }) => {
  const [search, setSearch] = useState("");

  onSubmit = (e) => console.log(e);

  return (
    <div
      style={{
        width: "70%",
        position: "absolute",
        top: "20%",
        zIndex: "100",
        left: "calc(50% - 35%)",
      }}
    >
      <Card style={visible ? {} : { display: "none" }}>
        <span className="p-float-label">
          <InputText
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={onSubmit}
            onKeyPress={(e) => {
              if (e.code == "Enter") {
                onSubmit(search);
              }
            }}
            style={{ width: "100%" }}
          />
          <label htmlFor="search">Search</label>
        </span>
      </Card>
    </div>
  );
};
