import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";
import dummy from "../data.json";

const arr = [];

for (let i = 1; i < dummy.value.length; i++) {
  arr.push([i, dummy.value[i].value]);
}
/*
for (let i = 1; i <= 180; i++) {
  arr.push([i, i + 1]);
}
*/
const options = {
  chart: {
    zoom: {
      enabled: false
    }
  },
  markers: {
    size: 0,
    style: "hollow"
  },
  dataLabels: {
    enabled: false
  },
  toolbar: {
    show: false
  },
  stroke: {
    curve: "straight"
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5
    }
  },
  xaxis: {
    type: "numeric",
    labels: {
      formatter: function(value) {
        return `${Math.floor(value / 60)}:${Math.floor(value % 60)}`;
      }
    }
  }
};

const series = [
  {
    name: "Trend",
    data: arr
  }
];

const Trend = () => {
  return (
    <Container title={<Title>Trend in EEG</Title>} hoverable bordered={true}>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="350"
      />
    </Container>
  );
};
export default Trend;

const Container = styled(Card)`
  width: 930px;
  height: 430px;
`;

const Title = styled("span")`
  font-size: 18px;
`;
