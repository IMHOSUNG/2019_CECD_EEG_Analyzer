import React from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import { Card } from "antd";

const options = {
  labels: ["10대", "20대", "30대", "40대"],
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

const Container = styled(Card)`
  width: 450px;
  height: 430px;
`;

const Title = styled("span")`
  font-size: 18px;
`;

const Age = ({ object }) => {
  const series = [
    object.age[0].count,
    object.age[1].count,
    object.age[2].count,
    object.age[3].count
  ];
  return (
    <Container title={<Title>연령 대 분포</Title>} hoverable bordered={true}>
      <ReactApexChart options={options} series={series} type="donut" />
    </Container>
  );
};
export default Age;
