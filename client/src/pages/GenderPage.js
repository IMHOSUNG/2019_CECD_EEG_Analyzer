import React from "react";
import styled from "styled-components";
import { Col, Row } from "antd";
import Percentage from "../components/Gender/Percentage";
import GenderChart from "../components/Gender/GenderChart";
import { connect } from "react-redux";
import { getData } from "../modules/gender";

const PageContainer = styled("div")`
  background-color: #f0f3f7;
  height: 960px;
`;

const Content = styled(Col)`
  && {
    padding: 10px;
    display: flex;
    justify-content: center;
  }
`;

const GenderPage = ({ data, loadingData, getData }) => {
  React.useEffect(() => {
    getData();
  }, [getData]);
  if (!loadingData) console.log(data);

  return (
    <PageContainer>
      <Row>
        <Content lg={8}>
          {!loadingData && data && (
            <Percentage
              name="남성"
              percent={parseInt(
                (data[0].count / (data[0].count + data[1].count)) * 100
              )}
              value={data[0].count}
            />
          )}
        </Content>
        <Content lg={16}>
          {!loadingData && data && <GenderChart object={data[0]} />}
        </Content>
      </Row>
      <Row>
        <Content lg={8}>
          {!loadingData && data && (
            <Percentage
              name="여성"
              color="red"
              percent={parseInt(
                (data[1].count / (data[0].count + data[1].count)) * 100
              )}
              value={data[1].count}
            />
          )}
        </Content>
        <Content lg={16}>
          {!loadingData && data && <GenderChart object={data[1]} />}
        </Content>
      </Row>
    </PageContainer>
  );
};

export default connect(
  ({ gender }) => ({
    data: gender.data,
    loadingData: gender.loading.GET_DATA
  }),
  {
    getData
  }
)(GenderPage);
