import React, { useState } from "react";

import { Card } from "primereact/card";

import { StocksMenubar } from "../../Menubars/StocksMenubar";
import { Page } from "../../Page/Page";

import { ProgressSpinner } from "primereact/progressspinner";

import "./style.scss";

export const OverviewView = (props) => {
  const loading = props.loading ? props.loading : false;

  let stockItems;

  if (props.items) {
    stockItems = props.items.map((item) => {
      console.log("item", item);
      return (
        <StockItem
          key={item.id}
          name={item.name}
          id={item.id}
          status_abs={item.status_abs}
          status_perc={item.status_perc}
          price={item.price}
          positive={item.positive}
          timestamp={item.timestamp}
        />
      );
    });
  } else {
    console.error("items undefined!");
  }

  if (props)
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <header>
          <StocksMenubar
            onAddClicked={() => (window.location.href = "/search")}
            onLogoutClicked={() => {
              props.onLogout();
            }}
          />
        </header>
        <Page>
          {loading == true ? (
            <ProgressSpinner style={{ display: "flex", marginTop: 20 }} />
          ) : stockItems.length > 0 ? (
            stockItems
          ) : (
            <Card className={"stock-item"}>No items saved..</Card>
          )}
        </Page>
      </div>
    );
};

function StockItem({
  name,
  id,
  status_abs,
  status_perc,
  price,
  positive,
  timestamp,
}) {
  return (
    <Card className={"stock-item"}>
      <a href={"stock/" + id} className={"nolink"}>
        <div className={"flex-row"}>
          <div className={"stock-item-info flex-col"}>
            <span className={"stock-item-info-name"}>{name}</span>
            <span className={"stock-item-info-id"}>{id}</span>
            <span className="stock-item-info-timestamp">{timestamp}</span>
            <span
              className={
                positive
                  ? "stock-item-info-status positive"
                  : "stock-item-info-status negative"
              }
            >
              {status_perc}% {status_abs}$
            </span>
          </div>
          <div className={"flex-col"}>
            <span
              className={
                positive
                  ? "stock-item-price positive"
                  : "stock-item-price negative"
              }
            >
              {price}$
            </span>
          </div>
        </div>
      </a>
    </Card>
  );
}
