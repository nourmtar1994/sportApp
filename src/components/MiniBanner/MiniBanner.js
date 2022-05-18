import { Affix, Button, Col, Row, Typography } from "antd";
import React from "react";
import * as classes from "./MiniBanner.module.css";
const MiniBanner = () => {
  return (
    <>
      <Affix style={{ width: "100%", zIndex: 1 }} offsetTop={100}>
        <div className={classes.bannerContainer}>
          <Row>
            <Col xs={{ span: 12, offset: 4 }}></Col>
          </Row>
        </div>
      </Affix>
    </>
  );
};
export default MiniBanner;
