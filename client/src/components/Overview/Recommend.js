import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";

let options = {
  chart: {
    zoom: {
      enabled: false
    }
  },
  colors: ["black"],
  markers: {
    size: 0,
    style: "hollow"
  },
  dataLabels: {
    enabled: false
  },
  toolbar: {
    show: false
  },
  stroke: {
    curve: "straight"
  },
  grid: {
    row: {
      colors: ["transparent"], // takes an array which will be repeated on columns
      opacity: 0.5
    }
  },
  xaxis: {
    type: "numeric",
    labels: {
      formatter: function(value) {
        return `${Math.floor(value / 60)}:${Math.floor(value % 60)}`;
      }
    }
  },
  yaxis: {
    show: false
  }
};

const makePoints = (points, arr) => {
  let answer = [];
  let colors = ["red", "blue"];
  let texts = ["Negative Max", "Negative Min", "Positive Max", "Postive Min"];
  let count = 0;
  points.forEach(point => {
    answer.push({
      x: point,
      y: arr[point],
      marker: {
        size: 4,
        fillColor: "#fff",
        strokeColor: count < 2 ? colors[0] : colors[1],
        radius: 2,
        cssClass: "apexcharts-custom-class"
      },
      label: {
        borderColor: count < 2 ? colors[0] : colors[1],
        offsetY: 0,
        style: {
          color: "#fff",
          background: count < 2 ? colors[0] : colors[1]
        },
        text: texts[count]
      }
    });
    count++;
  });
  return answer;
};

const Recommend = ({ object }) => {
  const series = [
    {
      name: "Trend",
      data: object.inclination.AllArr
    }
  ];

  const points = [
    object.inclination.NagativeMaxTime,
    object.inclination.NagativeMinTime,
    object.inclination.PostiveMaxTime,
    object.inclination.PostiveMinTime
  ];

  options = {
    ...options,
    annotations: {
      points: makePoints(points, object.inclination.AllArr)
    }
  };
  return (
    <Container
      title={<Title>추천 광고 삽입 지점</Title>}
      hoverable
      bordered={true}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="350"
      />
    </Container>
  );
};
export default Recommend;

const Container = styled(Card)`
  width: 930px;
  height: 430px;
`;

const Title = styled("span")`
  font-size: 18px;
`;
