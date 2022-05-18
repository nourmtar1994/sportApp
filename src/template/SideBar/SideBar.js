import React, { useEffect, useState } from "react";
import { Layout, Typography, Menu, Affix, Divider, Image } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import {
  FcHome,
  FcConferenceCall,
  FcInspection,
  FcTodoList,
  FcDatabase,
  FcManager,
} from "react-icons/fc";
import * as classes from "./SideBar.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/emaa.png";

const { Sider } = Layout;
const { SubMenu } = Menu;
const open = { left: 270, top: 17 };
const close = { left: 100, top: 17 };

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  useEffect(() => {
    setCollapsed(!matches);
  }, [matches]);

  return (
    <>
      <Affix offsetTop={12}>
        {matches && (
          <div
            className={classes.collapseBtnContainer}
            onClick={() => setCollapsed(!collapsed)}
            style={!collapsed ? open : close}
          >
            <span>
              {collapsed ? <MenuUnfoldOutlined className={classes.icon_SB_collapse} /> : <MenuUnfoldOutlined className={classes.icon_SB_collapse} />}
            </span>

          </div>
        )}
      </Affix>

      <Affix offsetTop={0} style={{ height: "100vh" }}>
        <Sider
          width={250}
          className={`${classes.sideBar}  app-sider`}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className={classes.appLogo_Container} align="center">
            <Typography.Title level={5} style={{ color: "#fff" }}>
              <br /> APP LOGO
            </Typography.Title>
          </div>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Divider className={classes.divider} />

            <NavLink to="/" exact className="route_link" activeClassName="activeLink" >
              <Menu.Item key="1" icon={<FcHome size={27} />}  >
                {!collapsed && "Dashboard"}
              </Menu.Item>
            </NavLink>

            <NavLink to="/dashboard2" className="route_link" exact activeClassName="activeLink">
              <Menu.Item key="2" icon={<FcInspection size={27} />}  >
                {!collapsed && "Dashboard2"}

              </Menu.Item>
            </NavLink>

            <NavLink to="/" exact className="route_link">
              <Menu.Item key="4" icon={<FcConferenceCall size={27} />} >
                {!collapsed && "Menu 2"}
              </Menu.Item>
            </NavLink>

            <NavLink to="/" exact className="route_link" >
              <Menu.Item key="6" icon={<FcTodoList size={27} />}  >
                {!collapsed && "Menu 3"}
              </Menu.Item>
            </NavLink>

            <NavLink to="/" exact className="route_link">
              <Menu.Item key="7" icon={<FcDatabase size={27} />} >
                {!collapsed && "Menu 4"}
              </Menu.Item>
            </NavLink>
          </Menu>
        </Sider>
      </Affix>
    </>
  );
};
export default SideBar;
