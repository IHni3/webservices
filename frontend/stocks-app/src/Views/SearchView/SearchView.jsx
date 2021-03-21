import React, { useState } from "react";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";

import { ProgressSpinner } from "primereact/progressspinner";

import "./style.scss";
import { SingleStockMenubar } from "../../Menubars/SingleStockMenubar";
import { Page } from "../../Page/Page";

export const SearchView = ({
  items,
  onSearchStringChanged,
  loading,
  onAddSymbol,
}) => {
  const [search, setSearch] = useState("");

  console.log(items);

  const renderedItems = items.map((e) => {
    return (
      <Card style={{ marginTop: 15 }} key={e.symbol}>
        <div
          className={"flex-row"}
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 10px 0 10px",
          }}
        >
          <div className={"flex-col"} style={{ paddingLeft: 15 }}>
            <span>
              <h3 style={{ margin: 0 }}>{e.name}</h3>
            </span>
            <span style={{ fontSize: 12 }}>{e.symbol}</span>
          </div>
          <div>
            <span>
              <i
                className={"pi-plus pi"}
                style={{
                  fontSize: "1.5em",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={() => onAddSymbol(e.symbol)}
              />
            </span>
          </div>
        </div>
      </Card>
    );
  });

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <header>
        <SingleStockMenubar title={"Search"} />
      </header>
      <Page>
        <Card style={{ marginTop: 15 }}>
          <span className="p-float-label">
            <InputText
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSubmit={() => onSearchStringChanged(search)}
              onKeyPress={(e) => {
                if (e.code == "Enter") {
                  onSearchStringChanged(search);
                }
              }}
              style={{ width: "100%" }}
            />
            <label htmlFor="search">Search</label>
          </span>
        </Card>
        {loading == true ? (
          <ProgressSpinner style={{ display: "flex", marginTop: 20 }} />
        ) : (
          <div>{renderedItems}</div>
        )}
      </Page>
    </div>
  );
};
