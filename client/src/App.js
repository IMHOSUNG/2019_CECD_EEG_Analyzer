import React from "react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Link, Route } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import UploadPage from "./pages/UploadPage";
import "antd/dist/antd.css";
import { Layout, Menu, Icon } from "antd";
const { Header, Footer } = Layout;

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`;

const App = () => {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <GlobalStyle />
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="0"></Menu.Item>
            <Menu.Item key="1">
              <Link to="/overview">
                <Icon type="bar-chart" />
                OVERVIEW
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/upload">
                <Icon type="upload" />
                Upload
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <main>
          <Route exact path="/" component={OverviewPage} />
          <Route path="/overview" component={OverviewPage} />
          <Route path="/upload" component={UploadPage} />
        </main>
        <Footer style={{ textAlign: "center" }}>
          EEG Analyzer ©2019 Created by Code Smith
        </Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
