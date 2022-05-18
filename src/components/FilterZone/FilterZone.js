import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DoubleLeftOutlined,
  LeftOutlined,
  ManOutlined,
  MinusCircleOutlined,
  ReloadOutlined,
  StarOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
//ANT DESIGN COMPONENTS
import { Radio, Select, Space, Tooltip, Typography } from "antd";
//CSS FILES
import * as classes from "./FilterZone.module.css";
const { Option } = Select;
const { Text } = Typography;

const FilterZone = ({ data, handleFilterData }) => {
  //data
  const [gradeData, setGradeData] = useState([]);
  //states
  const [Grade, setGrade] = useState(undefined);
  const [categorie, setCategorie] = useState(undefined);
  const [modele, setModele] = useState(null);
  const [sexe, setSexe] = useState(undefined);

  useEffect(() => {
    if (data) {
      const unique = [...new Set(data.map((item) => item.Grade))];
      setGradeData(unique);
    }
  }, [data]);

  const handleReset = () => {
    handleFilterData({ type: "reset", value: null });
    setGrade(null);
    setCategorie(null);
    setModele(null);
  };
  const handleFilterOption = (type, value) => {
    handleReset();
    if (type === "rank") {
      handleFilterData({ type, value });
      setGrade(value);
    }

    if (type === "category") {
      handleFilterData({ type, value });
      setCategorie(value);
    }
    if (type === "modele8") {
      handleFilterData({ type, value });
      setModele(value);
    }
  };

  return (
    <Space className={classes.filterContainer}>
      <div className={classes.filterGroup}>
        <Text className={classes.title}>الرتبة</Text>
        <Select
          value={Grade}
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
          onChange={(e) => handleFilterOption("rank", e)}
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
        <Radio.Group
          value={categorie}
          onChange={(value) =>
            handleFilterOption("category", value.target.value)
          }
        >
          <Tooltip title="رجال جيش">
            <Radio.Button value={"رجال جيش"}>
              <LeftOutlined style={{ color: "green" }} />
            </Radio.Button>
          </Tooltip>
          <Tooltip title="ضباط صف">
            <Radio.Button value={"ضباط صف"}>
              <DoubleLeftOutlined style={{ color: "#faad14" }} />
            </Radio.Button>
          </Tooltip>
          <Tooltip title="ضباط">
            <Radio.Button value={"ضباط"}>
              <StarOutlined style={{ color: "red" }} />
            </Radio.Button>
          </Tooltip>
        </Radio.Group>
      </div>
      <div className={classes.filterGroup}>
        <Text className={classes.title}>أنموذج 8</Text>
        <Radio.Group
          value={modele}
          onChange={(value) =>
            handleFilterOption("modele8", value.target.value)
          }
        >
          <Tooltip title="مؤهل">
            <Radio.Button value={1}>
              <CheckCircleOutlined style={{ color: "green" }} />
            </Radio.Button>
          </Tooltip>
          <Tooltip title="غير مؤهل / مؤهل">
            <Radio.Button value={null}>
              <MinusCircleOutlined style={{ color: "grey" }} />
            </Radio.Button>
          </Tooltip>
          <Tooltip title="غير مؤهل">
            <Radio.Button value={0}>
              <CloseCircleOutlined style={{ color: "red" }} />
            </Radio.Button>
          </Tooltip>
        </Radio.Group>
      </div>

      <div className={classes.filterGroup}>
        <Text className={classes.title}>الجنس</Text>
        <Radio.Group
          value={sexe}
          onChange={(value) => setSexe(value.target.value)}
        >
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
          <ReloadOutlined onClick={(e) => handleReset()} />
        </Tooltip>
      </span>
    </Space>
  );
};

export default FilterZone;
