import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { logout } from "../../actions/auth";

import plottingItemsApiInstance from "../../ApiInstances/plottingItemsApiInstance";
import overviewItemsApiInstance from "../../ApiInstances/overviewItemsApiInstance";
import tableItemsApiInstance from "../../ApiInstances/tableItemsApiInstance";
import { SingleStockView } from "./SingleStockView";

export function SingleStock(props) {
  const symbol = props.match.params.id;
  const [plottingItems, setPlottingItems] = useState({
    labels: [],
    data: [],
  });
  const [overviewItem, setOverviewItem] = useState({});
  const token = localStorage.getItem("user_token");
  const [timePeriod, setTimePeriod] = useState("month");
  const [tableItems, setTableItems] = useState([]);

  useEffect(() => {
    fetchPlottingData();
  }, [timePeriod]);

  useEffect(() => {
    fetchOverviewItems();
    fetchTableItems();
  }, [token]);

  function fetchTableItems() {
    tableItemsApiInstance
      .apiTableItemsPost(symbol)
      .then((data) => {
        setTableItems(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function fetchPlottingData() {
    plottingItemsApiInstance
      .apiPlottingItemsPost(symbol, timePeriod)
      .then((data) => {
        setPlottingItems(preparePlottingItems(data));
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function fetchOverviewItems() {
    overviewItemsApiInstance
      .apiOverviewItemsPost(token)
      .then((data) => {
        const item = findOverviewObjectBySymbol(data, symbol);
        setOverviewItem(item);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function findOverviewObjectBySymbol(array, symbol) {
    let ret = null;

    array.forEach((cur) => {
      if (cur.id === symbol) {
        ret = cur;
      }
    });

    if (ret === null)
      console.error("symbol", symbol, "not found in overview items!");

    return ret;
  }

  function preparePlottingItems(rawItems) {
    let labels = new Array();
    let data = new Array();

    for (let i = rawItems.length - 1; i >= 0; i--) {
      const item = rawItems[i];
      data.push(item.price);
      labels.push(item.date);
    }

    return { labels: labels, data: data };
  }

  return (
    <SingleStockView
      onLogout={() => props.logout()}
      plottingItems={plottingItems}
      overviewItem={overviewItem}
      tableItems={tableItems}
      onTimePeriodChanged={(periodString) => {
        setTimePeriod(periodString);
      }}
    />
  );
}

export default connect(null, { logout })(SingleStock);
