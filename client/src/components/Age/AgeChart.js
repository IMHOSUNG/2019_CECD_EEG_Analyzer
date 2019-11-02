import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

const options = {
  chart: {
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    }
  },
  dataLabel: {
    enabled: false
  },
  stroke: {
    curve: "smooth"
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00",
      "2018-09-19T01:30:00",
      "2018-09-19T02:30:00",
      "2018-09-19T03:30:00",
      "2018-09-19T04:30:00",
      "2018-09-19T05:30:00",
      "2018-09-19T06:30:00"
    ]
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm"
    }
  }
};

const series = [
  {
    name: "10대",
    data: [1, 2, 4, 5, 15, 28, 38, 46]
  },
  {
    name: "20대",
    data: [20, 29, 37, 36, 44, 45, 50, 58]
  },
  {
    name: "30대",
    data: [10, 19, 17, 36, 44, 45, 20, 38]
  },
  {
    name: "40대",
    data: [2, 45, 1, 5, 2, 62, 15, 3]
  }
];

const Container = styled(Card)`
  width: 1650px;
  height: 480px;
`;

const Title = styled("span")`
  font-size: 18px;
`;

const AgeChart = () => {
  return (
    <Container title={<Title>Trend with AGE</Title>} hoverable bordered={true}>
      <ReactApexChart options={options} series={series} height={360} />
    </Container>
  );
};
export default AgeChart;
