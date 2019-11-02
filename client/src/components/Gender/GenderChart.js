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
    data: [31, 40, 28, 51, 42, 109, 100]
  }
];

const Container = styled(Card)`
  width: 950px;
  height: 350px;
`;

const Title = styled("span")`
  font-size: 18px;
`;

const GenderChart = () => {
  return (
    <Container hoverable bordered={true}>
      <ReactApexChart options={options} series={series} height={300} />
    </Container>
  );
};
export default GenderChart;
