import React from "react";
import styled from "styled-components";
import { BrowserRouter, Link, Route } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import UploadPage from "./pages/UploadPage";
import AgePage from "./pages/AgePage";
import GenderPage from "./pages/GenderPage";
import "antd/dist/antd.css";
import { Layout, Menu, Icon } from "antd";
const { Header, Sider, Content } = Layout;

const Trigger = styled(Icon)`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;

const LogoContainer = styled("div")`
  height: 32px;
  padding-left: 10px;
  margin: 16px;
`;

const LogoIcon = styled(Icon)`
  && {
    color: white;
    width: 30px;
    font-size: 30px;
    height: 30px;
  }
`;
const LogoName = styled("span")`
  color: white;
  padding: 5px;
  font-size: 16px;
`;

const App = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <BrowserRouter>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <LogoContainer>
            <LogoIcon type="bar-chart" />
            {!collapsed && <LogoName>EEG Analyzer</LogoName>}
          </LogoContainer>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
            <Menu.Item key="0">
              <Link to="/overview">
                <Icon type="dashboard" />
                <span className="nav-text">Overview</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Link to="/age">
                <Icon type="pie-chart" />
                <span className="nav-text">Age</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/gender">
                <Icon type="usergroup-add" />
                <span className="nav-text">Gender</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/upload">
                <Icon type="upload" />
                <span className="nav-text">Upload</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Trigger
              type={collapsed ? "menu-unfold" : "menu-fold"}
              onClick={toggle}
            />
          </Header>
          <Content
            style={{
              minHeight: 280
            }}
          >
            <Route exact path="/" component={OverviewPage} />
            <Route path="/overview" component={OverviewPage} />
            <Route path="/age" component={AgePage} />
            <Route path="/gender" component={GenderPage} />
            <Route path="/upload" component={UploadPage} />
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
