import React from "react";
import { Badge, Dropdown, Space, Menu, Button, Tooltip } from "antd";
import {
  AppstoreFilled,
  BellFilled,
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

import * as classes from "./notification.module.css";
import { logout } from "../Services/Auth";

const menu = (
  <Menu key={10}>
    <Menu.Item key={"menu1"}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item icon={<DownOutlined />} key={"menu3"}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    </Menu.Item>
    <Menu.Item key={"menu2"}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    </Menu.Item>
    <Menu.Item key={"menu5"} danger>
      a danger item
    </Menu.Item>
  </Menu>
);

const Notification = () => {
  return (
    <Space className={classes.notificationSpace}>
      <Dropdown
        className={classes.dropdown}
        overlay={menu}
        trigger={["click"]}
        placement="bottomRight"
        arrow
      >
        <AppstoreFilled className={classes.notificationIcon} />
      </Dropdown>
      <Dropdown
        className={classes.dropdown}
        overlay={menu}
        trigger={["click"]}
        placement="bottomRight"
        arrow
      >
        <Badge count={5}>
          <BellFilled className={classes.notificationIcon} />
        </Badge>
      </Dropdown>
      &nbsp; &nbsp;
      <Dropdown
        className={classes.dropdown}
        overlay={menu}
        trigger={["click"]}
        placement="bottomRight"
        arrow
      >
        <div className={classes.user_space}>
          <Button
            type="link"
            shape="circle"
            onClick={(e) => e.preventDefault()}
          >
            <UserOutlined className={classes.notificationIcon} />
          </Button>
          <DownOutlined />
        </div>
      </Dropdown>
    </Space>
  );
};
export default Notification;
