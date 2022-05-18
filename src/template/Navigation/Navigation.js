import React, { useState } from "react";
//ANT DESIGN CPM
import { Affix, Menu } from "antd";
//ICONS
import * as classes from "./Navigation.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
//ICONS
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const Navigation = () => {
  const [selected, setselected] = useState("mail");
  const handleClick = (e) => {
    setselected(e);
  };
  return (
    <Affix offsetTop={10}>
      <Menu
        className={classes.menu}
        color="#000"
        onClick={() => handleClick()}
        selectedKeys={selected}
        mode="horizontal"
      >
        <Menu.Item key="home" icon={<MailOutlined />}>
          <Link to={"/"}> الإستقبال</Link>
        </Menu.Item>
        <Menu.Item key="personnel" icon={<AppstoreOutlined />}>
          <Link to={"personnel"}>الأفراد </Link>
        </Menu.Item>
        <Menu.Item key="planification" icon={<AppstoreOutlined />}>
          <Link to={"planification"}>الحصص الرياضية</Link>
        </Menu.Item>

        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="البيانات">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="app2" icon={<AppstoreOutlined />}>
          <Link to={"configuration"}> الإعدادات</Link>
        </Menu.Item>
      </Menu>
    </Affix>
  );
};
export default Navigation;
