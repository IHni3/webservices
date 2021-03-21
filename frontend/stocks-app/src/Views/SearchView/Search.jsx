import React, { useEffect, useRef, useState } from "react";
import { SearchView } from "./SearchView";

import searchItemsApiInstance from "../../ApiInstances/searchItemsApiInstance";
import stocksApiInstance from "../../ApiInstances/stocksApiInstance";
import { ManipulationRequest } from "../../StocksApi";
import { Toast } from "primereact/toast";

export const Search = (props) => {
  const [searchString, setSerchString] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("user_token");

  const myToast = useRef(null);

  useEffect(() => {
    fetchSearchItems();
  }, [searchString]);

  function showToast(severityValue, summaryValue, detailValue) {
    myToast.current.show({
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  }

  function fetchSearchItems() {
    searchItemsApiInstance
      .apiSearchItemsPost(searchString)
      .then((data) => {
        setSearchItems(data);
        setLoading(false);
      })
      .catch((e) => {
        setSearchItems([]);
        setLoading(false);
        console.log(e);
      });
  }

  function addStock(symbol) {
    if (!symbol) {
      console.error("invalid parameter symbol");
      return;
    }

    stocksApiInstance
      .stocksAddPost({ token: token, isin: symbol })
      .then(() => {
        showToast("success", symbol, "Successfully added");
      })
      .catch((e) => {
        showToast("error", "Search", e);
      });
  }

  console.log("search", searchItems);

  return (
    <div>
      <Toast ref={myToast} />
      <SearchView
        onSearchStringChanged={(str) => setSerchString(str)}
        items={searchItems}
        loading={loading}
        onAddSymbol={(symbol) => addStock(symbol)}
      />
    </div>
  );
};
