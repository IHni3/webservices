import React, { useState } from "react";

import { Card } from "primereact/card";

import { StocksMenubar } from "../../Menubars/StocksMenubar";
import { Page } from "../../Page/Page";

import { SearchView } from "../SearchView/SearchView";

import "./style.scss";

export const OverviewView = (props) => {
  const [showSearch, setShowSearch] = useState();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <header className={showSearch ? "blur" : ""}>
        <StocksMenubar
          onAddClicked={(e) => setShowSearch(!showSearch)}
          onLogoutClicked={() => {
            props.onLogout();
            console.log("hereerree");
          }}
        />
      </header>
      <SearchView
        visible={showSearch}
        onSubmit={(value) => console.log(value)}
      />
      <Page className={showSearch ? "blur" : ""}>
        <StockItem
          name={"IShares EME (Acc)"}
          id={"LU12937486767"}
          status_abs={"5,03USD"}
          status_perc={"0,03%"}
          price={"120 USD"}
          positive={true}
        />
        <StockItem
          name={"IShares EME (Acc)"}
          id={"LU12937486767"}
          status_abs={"5,03USD"}
          status_perc={"0,03%"}
          price={"120 USD"}
          positive={true}
        />
        <StockItem
          name={"IShares EME (Acc)"}
          id={"LU12937486767"}
          status_abs={"5,03USD"}
          status_perc={"0,03%"}
          price={"120 USD"}
          positive={false}
        />
        <StockItem
          name={"IShares EME (Acc)"}
          id={"LU12937486767"}
          status_abs={"5,03USD"}
          status_perc={"0,03%"}
          price={"120 USD"}
          positive={false}
        />
        <StockItem
          name={"IShares EME (Acc)"}
          id={"LU12937486767"}
          status_abs={"5,03USD"}
          status_perc={"0,03%"}
          price={"120 USD"}
          positive={false}
        />
      </Page>
    </div>
  );
};

function StockItem({ name, id, status_abs, status_perc, price, positive }) {
  return (
    <Card className={"stock-item"}>
      <a href={"stock/" + id} className={"nolink"}>
        <div className={"flex-row"}>
          <div className={"stock-item-info flex-col"}>
            <span className={"stock-item-info-name"}>{name}</span>
            <span className={"stock-item-info-id"}>{id}</span>
            <span
              className={
                positive
                  ? "stock-item-info-status positive"
                  : "stock-item-info-status negative"
              }
            >
              {status_perc} {status_abs}
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
              {price}
            </span>
          </div>
        </div>
      </a>
    </Card>
  );
}
