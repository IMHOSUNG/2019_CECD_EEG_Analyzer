import React from "react";
import styled from "styled-components";
import { Card, Progress, Statistic } from "antd";

const Container = styled(Card)`
  width: 350px;
  height: 270px;
  .ant-card-actions {
    height: 80px;
  }
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

const Percentage = ({ boundary, percent, color }) => {
  return (
    <Container
      title={<Title>{boundary}</Title>}
      size="small"
      hoverable
      onClick={() => console.log("a")}
      bordered={true}
      actions={[<Statistic title="Trend by" value={`${12}명`} />]}
    >
      <CustomProgress type="circle" strokeColor={color} percent={percent} />
    </Container>
  );
};
export default Percentage;
