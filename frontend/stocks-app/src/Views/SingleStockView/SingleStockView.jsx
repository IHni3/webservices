import React, { useState, useEffect } from "react";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";

import { SingleStockMenubar } from "../../Menubars/SingleStockMenubar";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import ProductService from "./ProductService";

import { Page } from "../../Page/Page";

import "./style.scss";

export const SingleStockView = (props) => {
  const id = props.match.params.id;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <header>
        <SingleStockMenubar />
      </header>
      <Page className={"single-stock-view"}>
        <Card className={"single-stock-view-card"}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CurrencySelect />
            <TimePeriodSelect />
          </div>
        </Card>
        <Card className={"single-stock-view-card"}>
          <StockChart />
        </Card>
        <Card className={"single-stock-view-card"}>
          <DataTableBasicDemo />
        </Card>
        <Card className={"single-stock-view-card"}>
          <PerformanceIndicators />
        </Card>
      </Page>
    </div>
  );
};

function CurrencySelect() {
  return (
    <span className={"p-buttonset"}>
      <Button label="EUR" icon="pi pi-euro" />
      <Button label="USD" icon="pi pi-dollar" />
    </span>
  );
}
function TimePeriodSelect() {
  return (
    <span className={"p-buttonset"}>
      <Button label="1M" />
      <Button label="3M" />
      <Button label="6M" />
      <Button label="1J" />
      <Button label="MAX" />
    </span>
  );
}
function StockChart() {
  const options = {
    title: {
      display: true,
      text: "My Title",
      fontSize: 16,
    },
    legend: {
      position: "bottom",
    },
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Second Dataset",
        data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: "#B89B44",
      },
    ],
  };

  return <Chart type="line" data={data} options={options} />;
}
function PerformanceIndicators(/*params: type*/) {
  const data = [
    { key: "Velocity", value: "27,01%" },
    { key: "Tracking Error", value: "4,74%" },
    { key: "Shape Ratio", value: "12,3%" },
    { key: "test1", value: "value1" },
    { key: "test1", value: "value1" },
    { key: "test1", value: "value1" },
    { key: "test1", value: "value1" },
    { key: "test1", value: "value1" },
    { key: "test1", value: "value1" },
  ];

  const content = data.map((d) => (
    <div
      style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}
    >
      <div style={{ textAlign: "left", width: "100px", marginRight: "40px" }}>
        {d.key}
      </div>
      <div>{d.value}</div>
    </div>
  ));

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}
    >
      {content}
    </div>
  );
}

const DataTableBasicDemo = () => {
  const [products, setProducts] = useState([]);
  const productService = new ProductService();

  useEffect(() => {
    productService.getProductsSmall().then((data) => setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="card">
        <DataTable value={products}>
          <Column field="period" header="period"></Column>
          <Column field="absolute" header="absolute"></Column>
          <Column field="peranno" header="p. a."></Column>
        </DataTable>
      </div>
    </div>
  );
};
