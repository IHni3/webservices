import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { OverviewView } from "./OverviewView";
import { logout } from "../../actions/auth";

import overviewItemsApiInstance from "../../ApiInstances/overviewItemsApiInstance";

export function Overview(props) {
  const [overviewItems, setOverviewItems] = useState(new Array());
  const token = localStorage.getItem("user_token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [token]);

  function fetchItems() {
    overviewItemsApiInstance
      .apiOverviewItemsPost(token)
      .then((data) => {
        setOverviewItems(prepareItems(data));
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  function prepareItems(rawItems) {
    let preparedItems = new Array();

    console.log(rawItems);

    rawItems.forEach((item) => {
      preparedItems.push({
        name: item.name,
        id: item.id,
        status_abs: (Math.round(item.price * 100) / 100).toFixed(2),
        status_perc: (Math.round(item.trend * 100) / 100).toFixed(2),
        price: (Math.round(item.price * 100) / 100).toFixed(2),
        positive: item.trend > 0,
        timestamp: item.timeStamp,
      });
    });

    return preparedItems;
  }

  return (
    <OverviewView
      onLogout={() => props.logout()}
      items={overviewItems}
      loading={loading}
    />
  );
}

export default connect(null, { logout })(Overview);
