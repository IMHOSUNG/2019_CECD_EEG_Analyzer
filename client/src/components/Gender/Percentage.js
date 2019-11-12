import React from "react";
import styled from "styled-components";
import { Card, Progress, Statistic } from "antd";

const Container = styled(Card)`
  width: 400px;
  height: 350px;
`;

const Title = styled("span")`
  font-size: 18px;
`;

const CustomProgress = styled(Progress)`
  && {
    display: flex;
    justify-content: center;
  }
`;

const Percentage = ({ name, percent, color, value }) => {
  return (
    <Container
      title={<Title>{name}</Title>}
      hoverable
      bordered={true}
      actions={[<Statistic title="Trend by" value={`${value}명`} />]}
    >
      <CustomProgress
        type="circle"
        width={155}
        strokeColor={color}
        percent={percent}
      />
    </Container>
  );
};
export default Percentage;
