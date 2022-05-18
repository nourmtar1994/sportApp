import React, { useEffect, useState } from "react";
import { Col, Input, Row, Switch, Typography } from "antd";
import Notification from "../../components/Notification/Notification";
import * as classes from "./AppHeader.module.css";
import { BulbOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { FcNightPortrait, FcPortraitMode } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../redux/ModeSlices";

import sport_app_logo from "../../assets/images/sport_logo.png";
import Navigation from "../Navigation/Navigation";

const { Title } = Typography;
const AppHeader = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.value);
  const [switchValue, setSwitch] = useState(
    localStorage.getItem("sporAppMode") === "dark" ? true : false
  );
  const handleChangeMode = (e) => {
    let newMode = e ? "dark" : "light";
    dispatch(setMode(newMode));
  };
  useEffect(() => {
    handleChangeMode(
      localStorage.getItem("sporAppMode") === "dark" ? true : false
    );
  }, []);

  useEffect(() => {
    setSwitch(mode === "dark" ? true : false);
  }, [mode]);

  return (
    <>
      <Row className={classes.AppHeader} style={{ padding: 0 }}>
        {/* <Col span={1} align="center">
        <Switch
          onChange={(e) => handleChangeMode(e)}
          checkedChildren={<FcNightPortrait />}
          unCheckedChildren={<FcPortraitMode />}
          checked={switchValue}
        />
      </Col> */}
        <Col
          lg={{ span: 6, offset: 0 }}
          md={{ span: 6, offset: 0 }}
          sm={{ span: 6, offset: 0 }}
          xs={{ span: 6, offset: 0 }}
          className={classes.logoContainer}
        >
          {/* <div className={classes.app_logo}>
          <img src={sport_app_logo}></img>
        </div> */}
          <Title className={classes.app_title}>{window.document.title}</Title>
        </Col>
        <Col
          lg={{ span: 13, offset: 0, push: 0 }}
          md={{ span: 12, offset: 0, push: 0 }}
          sm={{ span: 12, offset: 0, push: 0 }}
          xs={{ span: 10 }}
        ></Col>

        <Col
          lg={{ span: 4, offset: 1, push: 0 }}
          md={{ span: 4, offset: 1, push: 0 }}
          sm={{ span: 4, offset: 1, push: 0 }}
          xs={{ span: 6 }}
        >
          <Notification />
        </Col>
        <Col
          lg={{ span: 18, offset: 3, push: 0 }}
          md={{ span: 18, offset: 3, push: 0 }}
          sm={{ span: 18, offset: 3, push: 0 }}
          xs={{ span: 24 }}
        >
          <Navigation />
        </Col>
      </Row>
      <Row></Row>
    </>
  );
};
export default AppHeader;
