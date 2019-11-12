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
    enabled: true
  },
  stroke: {
    curve: "smooth"
  }
};

const Container = styled(Card)`
  width: 1640px;
  height: 480px;
`;

const Title = styled("span")`
  font-size: 18px;
`;

const makeSeries = obj => {
  let arr = [];
  for (let i = 0; i < obj.length; i++) {
    arr.push(obj[i]);
  }
  return arr;
};

const AgeChart = ({ object }) => {
  console.log(object);
  const series = [
    {
      name: "10대",
      data: makeSeries(object["10"].seasonalValue.trend)
    },
    {
      name: "20대",
      data: makeSeries(object["20"].seasonalValue.trend)
    },
    {
      name: "30대",
      data: makeSeries(object["30"].seasonalValue.trend)
    },
    {
      name: "40대",
      data: makeSeries(object["40"].seasonalValue.trend)
    }
  ];

  return (
    <Container title={<Title>Trend with AGE</Title>} hoverable bordered={true}>
      <ReactApexChart options={options} series={series} height={360} />
    </Container>
  );
};
export default AgeChart;
