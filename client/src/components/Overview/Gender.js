import React from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import { Card } from "antd";

const options = {
  labels: ["남성", "여성"],
  plotOptions: {
    pie: {
      size: 140,
      expandOnClick: true
    }
  },
  dataLabels: {
    enabled: true,
    formatter: (val, opt) => {
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

const Gender = ({ object }) => {
  const series = [object.gender[0].count, object.gender[1].count];

  return (
    <Container title={<Title>성별 분포</Title>} hoverable bordered={true}>
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
