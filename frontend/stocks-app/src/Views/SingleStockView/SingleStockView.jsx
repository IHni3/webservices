import React from "react";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";

import { SingleStockMenubar } from "../../Menubars/SingleStockMenubar";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Page } from "../../Page/Page";

import "./style.scss";

export const SingleStockView = ({
  plottingItems,
  overviewItem,
  tableItems,
  onTimePeriodChanged,
}) => {
  const title = overviewItem.name ? overviewItem.name : "";
  const plotTitle = overviewItem.name ? overviewItem.name : "";
  const price = overviewItem.price ? "$" + overviewItem.price : "$ -";
  const timeStamp = overviewItem.timeStamp ? overviewItem.timeStamp : "-";

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <header>
        <SingleStockMenubar title={title} />
      </header>
      <Page className={"single-stock-view"}>
        <Card className={"single-stock-view-card"}>
          <h2 style={{ marginBottom: 5 }}>Current Price: {price}</h2>
          <span style={{ fontSize: 14 }}>{timeStamp}</span>
        </Card>

        <Card className={"single-stock-view-card"}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TimePeriodSelect onTimePeriodChanged={onTimePeriodChanged} />
          </div>
        </Card>
        <Card className={"single-stock-view-card"}>
          <StockChart
            labels={plottingItems.labels}
            data={plottingItems.data}
            title={plotTitle}
          />
        </Card>
        <Card className={"single-stock-view-card"}>
          <DataTableBasicDemo items={tableItems} />
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
function TimePeriodSelect({ onTimePeriodChanged }) {
  return (
    <span className={"p-buttonset"} style={{ width: "100%", marginBottom: 0 }}>
      <Button
        label="1D"
        className="p-button-blue"
        onClick={() => onTimePeriodChanged("today")}
        style={{ width: "20%" }}
      />
      <Button
        label="1M"
        className="p-button-blue"
        onClick={() => onTimePeriodChanged("month")}
        style={{ width: "20%" }}
      />
      <Button
        label="6M"
        className="p-button-blue"
        onClick={() => onTimePeriodChanged("6month")}
        style={{ width: "20%" }}
      />
      <Button
        label="1Y"
        className="p-button-blue"
        className="p-button-blue"
        onClick={() => onTimePeriodChanged("year")}
        style={{ width: "20%" }}
      />
      <Button
        label="MAX"
        className="p-button-blue"
        onClick={() => onTimePeriodChanged("max")}
        style={{ width: "20%" }}
      />
    </span>
  );
}
function StockChart({ labels, data, title }) {
  console.log(data);

  const options = {
    title: {
      display: true,
      text: title,
      fontSize: 18,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return "$" + value;
            },
          },
        },
      ],
    },
  };

  const plotData = {
    labels: labels,
    datasets: [
      {
        data: data,
        fill: false,
        borderColor: "#355BE6",
      },
    ],
  };

  return <Chart type="line" data={plotData} options={options} />;
}
function PerformanceIndicators() {
  const data = [
    { key: "Velocity", value: "- %" },
    { key: "Tracking Error", value: "- %" },
    { key: "Shape Ratio", value: "- %" },
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

const DataTableBasicDemo = ({ items }) => {
  let displayedItems = [];

  items.forEach((element) => {
    displayedItems.push({
      period: element.period,
      abs: Math.round(element.abs * 100) / 100 + "%",
      perAnno: Math.round(element.perAnno * 100) / 100 + "%",
    });
  });

  return (
    <div>
      <div className="card">
        <DataTable value={displayedItems}>
          <Column field="period" header="period"></Column>
          <Column field="abs" header="absolute"></Column>
          <Column field="perAnno" header="p. a."></Column>
        </DataTable>
      </div>
    </div>
  );
};
