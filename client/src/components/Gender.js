import React from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import { Card } from "antd";

const options = {
  labels: ["남성", "여성"],
  plotOptions: {
    pie: {
      size: 155,
      expandOnClick: true
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function(val, opt) {
      return (
        opt.w.globals.labels[opt.seriesIndex] + ": " + Math.floor(val) + "%"
      );
    },
    style: {
      fontSize: "15px"
    }
  },
  legend: {
    show: false
  }
};

const series = [70, 30];

const Gender = () => {
  return (
    <Container title={<Title>Gender</Title>} hoverable bordered={true}>
      <ReactApexChart options={options} series={series} type="pie" />
    </Container>
  );
};
export default Gender;

const Container = styled(Card)`
  width: 450px;
  height: 430px;
`;

const Title = styled("span")`
  font-size: 18px;
`;
