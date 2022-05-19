import { Affix, Col, Divider, Row, Typography, Upload, message } from "antd";
import React from "react";
import MiniBanner from "../MiniBanner/MiniBanner";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const AppData = () => {
  return (
    <Row>
      <MiniBanner />
      <div className="custom-space">
        <Col span={24}>
          <Typography.Title
            level={2}
            className={"appTitle"}
            style={{ color: "#000" }}
          >
            البيانات
          </Typography.Title>
        </Col>
        <Divider />
        <Col span={24}>
          <Dragger>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              أنقر هنا لتحميل ملف معدلات الإختبارات الطبية و الرياضية
            </p>
            <p className="ant-upload-hint">
              الرجاء التأكد من الأعداد و هيكل الملف لضمان حسن عمل المنظومة
            </p>
          </Dragger>
        </Col>
      </div>
    </Row>
  );
};
export default AppData;
