import React from "react";
import styled from "styled-components";
import { Col, Row } from "antd";
import Percentage from "../components/Age/Percentage";
import AgeChart from "../components/Age/AgeChart";

const PageContainer = styled("div")`
  background-color: #f0f3f7;
`;

const Content = styled(Col)`
  && {
    padding: 10px;
    display: flex;
    justify-content: center;
  }
`;

const AgePage = () => {
  return (
    <PageContainer>
      <Row>
        <Content lg={6}>
          <Percentage boundary="10대" percent="33" color="red" />
        </Content>
        <Content lg={6}>
          <Percentage boundary="20대" percent="33" color="blue" />
        </Content>
        <Content lg={6}>
          <Percentage boundary="30대" percent="33" color="green" />
        </Content>
        <Content lg={6}>
          <Percentage boundary="40대" percent="33" color="yellow" />
        </Content>
      </Row>
      <Row>
        <Content lg={24}>
          <AgeChart />
        </Content>
      </Row>
    </PageContainer>
  );
};
export default AgePage;
