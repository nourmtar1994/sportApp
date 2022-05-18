import React from "react";
//CSS FILES
import * as classes from "./TimeLineArrow.module.css";
//ICONS
import { Card, Col, Row, Typography } from "antd";

const TimeLineArrow = ({ element }) => {
  return (
    <Card>
      <Row align="center">
        {element.length &&
          element.map((item) => (
            <Col span={4}>
              <div className={`${classes.TimeLine}` + " " + item.color}>
                <div className={classes.TimeLineHeader}></div>
                <div className={classes.TimeLineHeader2}></div>
                <div className={classes.TimeLineBody}>
                  <Typography.Text className={classes.title}>
                    {item.title}
                  </Typography.Text>
                </div>
                <div className={classes.TimeLineFooter}></div>
              </div>
            </Col>
          ))}
      </Row>
    </Card>
  );
};

export default TimeLineArrow;
