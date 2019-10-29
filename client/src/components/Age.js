import React from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import { Card } from "antd";

const series = [44, 55, 41, 17, 15];
const options = {
  labels: ["10대", "20대", "30대", "40대", "50대"],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            fontSize: "20px"
          }
        },
        size: "45%"
      }
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function(val) {
      return parseInt(val) + "%";
    }
  },
  legend: {
    show: false
  }
};

const Age = () => {
  return (
    <Container title={<Title>Age</Title>} hoverable bordered={true}>
      <ReactApexChart options={options} series={series} type="donut" />
    </Container>
  );
};
export default Age;

const Container = styled(Card)`
  width: 450px;
  height: 430px;
`;

const Title = styled("span")`
  font-size: 18px;
`;
