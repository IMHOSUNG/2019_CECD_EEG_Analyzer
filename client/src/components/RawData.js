import React from "react";
import { Card } from "antd";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

const arr = [];
for (let i = 1; i <= 180; i++) {
  arr.push([i, Math.floor(Math.random() * 100 + 1)]);
}

const options = {
  chartOptionsArea: {
    chart: {
      id: "chartArea",
      toolbar: {
        autoSelected: "pan",
        show: false
      }
    },
    colors: ["#546E7A"],
    stroke: {
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: "numeric"
    }
  },
  chartOptionsBrush: {
    chart: {
      id: "chartBrush",
      brush: {
        target: "chartArea",
        enabled: true
      },
      selection: {
        enabled: true,
        xaxis: {
          min: 75,
          max: 105
        }
      }
    },
    colors: ["#008FFB"],
    fill: {
      type: "gradient"
    },
    xaxis: {
      type: "numeric",
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      tickAmount: 2
    }
  }
};

const series = [
  {
    data: arr.slice()
  }
];

const RawData = () => {
  return (
    <Container title={<Title>Raw EEG Data</Title>} hoverable bordered={true}>
      <ReactApexChart
        options={options.chartOptionsArea}
        series={series}
        type="line"
        height="200"
      />

      <ReactApexChart
        options={options.chartOptionsBrush}
        series={series}
        type="area"
        height="100"
      />
    </Container>
  );
};

const Container = styled(Card)`
  width: 930px;
  height: 430px;
`;

const Title = styled("span")`
  font-size: 18px;
`;

export default RawData;
