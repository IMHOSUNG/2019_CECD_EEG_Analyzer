import React from "react";
import { Col, Row } from "antd";
import styled from "styled-components";
import RawData from "../components/Overview/RawData";
import Trend from "../components/Overview/Trend";
import Gender from "../components/Overview/Gender";
import Age from "../components/Overview/Age";
import Recommend from "../components/Overview/Recommend";
import { connect } from "react-redux";
import { getData } from "../modules/overview";

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

// eslint-disable-next-line no-undef
Apex = {
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: "straight"
  },
  toolbar: {
    tools: {
      selection: false
    }
  },
  markers: {
    size: 0,
    style: "hollow"
  },
  tooltip: {
    followCursor: false,
    theme: "dark",
    x: {
      show: false
    },
    marker: {
      show: false
    },
    y: {
      title: {
        formatter: () => {
          return "";
        }
      }
    }
  },
  grid: {
    clipMarkers: false
  },
  yaxis: {
    tickAmount: 2
  },
  xaxis: {
    type: "numeric",
    labels: {
      formatter: value => {
        return `${Math.floor(value / 60)}:${Math.floor(value % 60)}`;
      }
    }
  }
};

const OverviewPage = ({ data, loadingData, getData }) => {
  React.useEffect(() => {
    getData();
  }, [getData]);
  console.log(data);
  return (
    <PageContainer>
      <Row>
        <Content lg={6}>
          {!loadingData && data && <Age object={data} />}
        </Content>
        <Content lg={6}>
          {!loadingData && data && <Gender object={data} />}
        </Content>
        <Content lg={12}>
          {!loadingData && data && <RawData object={data} />}
        </Content>
      </Row>
      <Row>
        <Content lg={12}>
          {!loadingData && data && <Recommend object={data} />}
        </Content>
        <Content lg={12}>
          {!loadingData && data && <Trend object={data} />}
        </Content>
      </Row>
    </PageContainer>
  );
};

export default connect(
  ({ overview }) => ({
    data: overview.data,
    loadingData: overview.loading.GET_DATA
  }),
  {
    getData
  }
)(OverviewPage);
