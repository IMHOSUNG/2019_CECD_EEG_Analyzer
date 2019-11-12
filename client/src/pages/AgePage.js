import React from "react";
import styled from "styled-components";
import { Col, Row } from "antd";
import Percentage from "../components/Age/Percentage";
import AgeChart from "../components/Age/AgeChart";
import { connect } from "react-redux";
import { getData } from "../modules/age";

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

const AgePage = ({ data, loadingData, getData }) => {
  React.useEffect(() => {
    getData();
  }, [getData]);
  console.log(data);
  return (
    <PageContainer>
      <Row>
        <Content lg={6}>
          {!loadingData && data && (
            <Percentage
              boundary="10대"
              percent={parseInt(
                (data["10"].count / data["10"].total.count) * 100
              )}
              count={data["10"].count}
              color="red"
            />
          )}
        </Content>
        <Content lg={6}>
          {!loadingData && data && (
            <Percentage
              boundary="20대"
              percent={parseInt(
                (data["20"].count / data["20"].total.count) * 100
              )}
              count={data["20"].count}
              color="blue"
            />
          )}
        </Content>
        <Content lg={6}>
          {!loadingData && data && (
            <Percentage
              boundary="30대"
              percent={parseInt(
                (data["30"].count / data["30"].total.count) * 100
              )}
              count={data["30"].count}
              color="green"
            />
          )}
        </Content>
        <Content lg={6}>
          {!loadingData && data && (
            <Percentage
              boundary="40대"
              percent={parseInt(
                (data["40"].count / data["40"].total.count) * 100
              )}
              count={data["40"].count}
              color="yellow"
            />
          )}
        </Content>
      </Row>
      <Row>
        <Content lg={24}>
          {!loadingData && data && <AgeChart object={data} />}
        </Content>
      </Row>
    </PageContainer>
  );
};

export default connect(
  ({ age }) => ({
    data: age.data,
    loadingData: age.loading.GET_DATA
  }),
  {
    getData
  }
)(AgePage);
