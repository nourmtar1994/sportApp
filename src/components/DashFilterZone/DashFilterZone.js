import React, { useEffect, useState } from "react";
import { Space, Tooltip, Typography, Radio, Select } from "antd";
import {
  ReloadOutlined,
  LeftOutlined,
  DoubleLeftOutlined,
  StarOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import * as classes from "./DashFilterZone.module.css";

const { Text } = Typography;
const { Option } = Select;
const DashFilterZone = ({ data }) => {
  const [gradeData, setGradeData] = useState([]);

  useEffect(() => {
    if (data) {
      const unique = [...new Set(data.map((item) => item.Grade))];
      setGradeData(unique);
    }
  }, [data]);
  return (
    <Space className={classes.filterContainer}>
      <div className={classes.filterGroup}>
        <Text className={classes.title}>الرتبة</Text>
        <Select
          // value={Grade}
          loading={gradeData.length <= 0 ? true : false}
          allowClear
          showSearch
          style={{ width: 135 }}
          placeholder="إختر الرتبة"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
          // onChange={(e) => handleFilterOption("rank", e)}
        >
          {gradeData?.map((item, index) => (
            <Option value={item} key={index}>
              {item}
            </Option>
          ))}
        </Select>
      </div>

      <div className={classes.filterGroup}>
        <Text className={classes.title}>الصنف</Text>
        <Radio.Group>
          <Tooltip title="رجال جيش">
            <Radio.Button value={true}>
              <LeftOutlined style={{ color: "green" }} />
            </Radio.Button>
          </Tooltip>
          <Tooltip title="ضباط صف">
            <Radio.Button value={undefined}>
              <DoubleLeftOutlined style={{ color: "#faad14" }} />
            </Radio.Button>
          </Tooltip>
          <Tooltip title="ضباط">
            <Radio.Button value={false}>
              <StarOutlined style={{ color: "red" }} />
            </Radio.Button>
          </Tooltip>
        </Radio.Group>
      </div>

      <div className={classes.filterGroup}>
        <Text className={classes.title}>الإختصاص</Text>
        <Select
          // value={Grade}
          loading={gradeData.length <= 0 ? true : false}
          allowClear
          showSearch
          style={{ width: 135 }}
          placeholder="إختر الإختصاص"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
          // onChange={(e) => handleFilterOption("rank", e)}
        >
          <Option value={1}>مبرمج إعلامية</Option>
          <Option value={2}>مشاة</Option>
          <Option value={3}>ملاح</Option>
          <Option value={4}>إدارة</Option>
          <Option value={5}>رياضة</Option>
          <Option value={6}>طيار</Option>
          <Option value={7}>مكانيك طائرات</Option>
          <Option value={8}>طبخ و حلويات</Option>
          <Option value={9}>موسيقى</Option>
        </Select>
      </div>

      <div className={classes.filterGroup}>
        <Text className={classes.title}>الجنس</Text>
        <Radio.Group>
          <Tooltip title="ذكر">
            <Radio.Button value={true}>
              <ManOutlined style={{ color: "#306ca7" }} />
            </Radio.Button>
          </Tooltip>
          <Tooltip title="أنثى">
            <Radio.Button value={false}>
              <WomanOutlined style={{ color: "#eb2f96" }} />
            </Radio.Button>
          </Tooltip>
        </Radio.Group>
      </div>

      <span className={classes.icon}>
        <Tooltip title="إعادة ضبط">
          <ReloadOutlined />
        </Tooltip>
      </span>
    </Space>
  );
};
export default DashFilterZone;
