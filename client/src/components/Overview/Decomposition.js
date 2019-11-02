import React from "react";
import { Card } from "antd";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

const arr = [];
for (let i = 1; i <= 180; i++) {
  arr.push([i, Math.floor(Math.random() * 100) + 1]);
}

const options = {
  seasonal: {
    chart: {
      id: "tw",
      group: "social"
    },
    colors: ["#546E7A"],
    yaxis: {
      show: false
    },
    xaxis: {
      labels: {
        show: false
      }
    }
  },
  residuals: {
    chart: {
      id: "yt",
      group: "social"
    },
    colors: ["#00E396"],
    yaxis: {
      show: false
    },
    xaxis: {
      labels: {
        show: false
      }
    }
  }
};

const Decomposition = ({ object }) => {
  const series = {
    seasonal: [
      {
        data: object.seasonalValue.seasonal
      }
    ],
    residuals: [
      {
        data: object.seasonalValue.resid
      }
    ]
  };
  return (
    <ComponentContainer
      title={<Title>Seasonal & Residuals </Title>}
      hoverable
      bordered={true}
    >
      <ReactApexChart
        type="line"
        height="150"
        options={options.seasonal}
        series={series.seasonal}
      />

      <ReactApexChart
        type="line"
        height="150"
        options={options.residuals}
        series={series.residuals}
      />
    </ComponentContainer>
  );
};

const ComponentContainer = styled(Card)`
  width: 930px;
  height: 430px;
`;

const Title = styled("span")`
  font-size: 18px;
`;

export default Decomposition;
