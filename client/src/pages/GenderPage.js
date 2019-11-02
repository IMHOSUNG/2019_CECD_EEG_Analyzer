import React from "react";
import styled from "styled-components";
import { Col, Row } from "antd";
import Percentage from "../components/Gender/Percentage";
import GenderChart from "../components/Gender/GenderChart";

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
const GenderPage = () => {
  return (
    <PageContainer>
      <Row>
        <Content lg={8}>
          <Percentage name="남성" percent={75} />
        </Content>
        <Content lg={16}>
          <GenderChart />
        </Content>
      </Row>
      <Row>
        <Content lg={8}>
          <Percentage name="여성" color="red" percent={25} />
        </Content>
        <Content lg={16}>
          <GenderChart />
        </Content>
      </Row>
    </PageContainer>
  );
};
export default GenderPage;
