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
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm"
    }
  }
};

const Container = styled(Card)`
  width: 950px;
  height: 350px;
`;

const makeSeries = obj => {
  let arr = [];
  for (let i = 0; i < obj.length; i++) {
    arr.push(obj[i]);
  }
  return arr;
};

const GenderChart = ({ object }) => {
  const series = [
    {
      data: makeSeries(object.seasonalValue.trend)
    }
  ];
  return (
    <Container hoverable bordered={true}>
      <ReactApexChart options={options} series={series} height={300} />
    </Container>
  );
};
export default GenderChart;
