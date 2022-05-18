import { Button, Col, Row, Typography } from "antd";
import React from "react";
import * as classes from "./Banner.module.css";
import imageBanner from "../../assets/images/sportBanner5.png";
const Banner = () => {
  return (
    <div className={classes.bannerContainer}>
      <Row>
        <Col xs={{ span: 12, offset: 4 }}>
          <Typography.Title level={2} className={"text-white"}>
            منضومة الأنشطة الرياضية
          </Typography.Title>
          <Typography.Text className="text-secondary" strong>
            تمكن منضومة الأنشطة الجوية من التصرف في الأنشطة الرياضية للأفراد
            بالجيش التونسي كما توفر إحصائيات و نضرة عامة حول هذه الأنشطة
          </Typography.Text>
          <br />
          <br />
          <Button type="primary" danger className={"danger"}>
            الأفراد
          </Button>
        </Col>
        <Col xs={{ span: 8 }}>
          <img
            height={320}
            width={"100%"}
            src={imageBanner}
            className={classes.bannerImage}
          />
          <br />
          <br />
          <br />
        </Col>
      </Row>
    </div>
  );
};
export default Banner;
