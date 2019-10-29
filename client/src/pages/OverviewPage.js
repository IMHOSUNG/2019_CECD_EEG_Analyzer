import React from "react";
import { Col, Row } from "antd";
import styled from "styled-components";
import Decomposition from "../components/Decomposition";
import RawData from "../components/RawData";
import Trend from "../components/Trend";
import Gender from "../components/Gender";
import Age from "../components/Age";
import { connect } from "react-redux";
import { getData } from "../modules/overview";

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
        formatter: function() {
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
      formatter: function(value) {
        return `${Math.floor(value / 60)}:${Math.floor(value % 60)}`;
      }
    }
  }
};

const OverviewPage = ({ data, loadingData, getData }) => {
  React.useEffect(() => {
    getData();
  }, [getData]);
  console.log(loadingData);
  console.log(data);
  return (
    <PageContainer>
      <Row>
        <Content lg={12}>{!loadingData && <RawData />}</Content>
        <Content lg={12}>{!loadingData && <Decomposition />}</Content>
      </Row>
      <Row>
        <Content lg={6}>{!loadingData && <Gender />}</Content>
        <Content lg={6}>{!loadingData && <Age />}</Content>
        <Content lg={12}>{!loadingData && <Trend />}</Content>
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
