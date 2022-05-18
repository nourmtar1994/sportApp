import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  Row,
  Col,
  Typography,
  Affix,
  Select,
  Divider,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import MiniBanner from "../MiniBanner/MiniBanner";
import axios from "axios";

const { Option } = Select;
const Configuration = () => {
  const [isOnTopPosition, setisOnTopPosition] = useState(false);
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const getArmy = async () => {
    try {
      const { data } = await axios.get("/army");
      console.log(data);
    } catch (error) {}
  };

  const getCorps = async () => {
    try {
      const { data } = await axios.get("/corps");
      console.log(data);
    } catch (error) {}
  };

  const getUnderCorps = async () => {
    try {
      const { data } = await axios.get("/underCorps");
      console.log(data);
    } catch (error) {}
  };
  useEffect(() => {
    getArmy();
    getCorps();
    getUnderCorps();
  }, []);

  return (
    <Row>
      <MiniBanner />
      <div className="custom-space">
        <Col span={24}>
          <Affix offsetTop={65} onChange={(e) => setisOnTopPosition(e)}>
            <Typography.Title
              level={2}
              className={"appTitle"}
              style={{ color: isOnTopPosition ? "#fff" : "#000" }}
            >
              الإعدادات
            </Typography.Title>
          </Affix>
        </Col>
        <Divider />
        <Col span={12} offset={6}>
          <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
            wrapperCol={12}
            layout="vertical"
          >
            <Form.Item
              label="جيش الإنتماء"
              name={["army"]}
              rules={[{ required: true, message: "champ obligatoire" }]}
            >
              <Select
                style={{ width: "100%" }}
                showSearch
                allowClear
                placeholder="جيش الإنتماء"
              >
                <Option value=""></Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="القاعدة/الإدارة/الفوج"
              name={["corps"]}
              rules={[{ required: true, message: "champ obligatoire" }]}
            >
              <Select
                style={{ width: "100%" }}
                showSearch
                allowClear
                placeholder="القاعدة/الإدارة/الفوج"
              >
                <Option value=""></Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="السرية/الوحدة/المكتب"
              name={["underCorps"]}
              rules={[{ required: true, message: "champ obligatoire" }]}
            >
              <Select
                style={{ width: "100%" }}
                showSearch
                allowClear
                placeholder="السرية/الوحدة/المكتب"
              >
                <Option value=""></Option>
              </Select>
            </Form.Item>

            <Divider />
            <Form.List name="service">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "block",
                        marginBottom: 8,
                        borderRight: "2px solid #e52433",
                        paddingRight: "30px",
                        position: "relative",
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        label="التسمية (العربية)"
                        {...restField}
                        name={[name, "label_AR"]}
                        rules={[
                          { required: true, message: "Champ obligatoire" },
                        ]}
                      >
                        <Input placeholder="التسمية (العربية)" />
                      </Form.Item>
                      <Form.Item
                        label="رمز التسمية  (العربية)"
                        {...restField}
                        name={[name, "shor_label_AR"]}
                        rules={[
                          { required: true, message: "Champ obligatoire" },
                        ]}
                      >
                        <Input placeholder="رمز التسمية (العربية)" />
                      </Form.Item>
                      <Form.Item
                        label="التسمية (الفرنسية)"
                        {...restField}
                        name={[name, "label_FR"]}
                        rules={[
                          { required: true, message: "Champ obligatoire" },
                        ]}
                      >
                        <Input placeholder="التسمية (الفرنسية)" />
                      </Form.Item>
                      <Form.Item
                        label="رمز التسمية  (الفرنسية)"
                        {...restField}
                        name={[name, "short_label_FR"]}
                        rules={[
                          { required: true, message: "Champ obligatoire" },
                        ]}
                      >
                        <Input placeholder=" رمز التسمية  (الفرنسية)" />
                      </Form.Item>
                      <div align="center">
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          style={{
                            fontSize: "25px",
                            margin: "5px",
                            color: " #e52433",
                            position: "absolute",
                            right: -35,
                            top: "50%",
                          }}
                        />
                      </div>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      إضافة فصيل/مصلحة
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </div>
    </Row>
  );
};
export default Configuration;
