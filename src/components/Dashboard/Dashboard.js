import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Affix,
  Input,
  Select,
  Statistic,
} from "antd";

import * as classes from "./Dashboard.module.css";
import { useSelector } from "react-redux";
import LineBar from "../../charts/LineBar/LineBar";

import { FcBarChart } from "react-icons/fc";
import DashFliterZone from "../DashFilterZone/DashFilterZone";
import { dataFromApi } from "../../redux/data";
import PieChart from "../../charts/Pie/Pie";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";

const { Option } = Select;
const Dashboard = ({ data }) => {
  const mode = useSelector((state) => state.mode.value);
  const [appMode, setAppMode] = useState(mode);
  const [personeldata, setPersoneldata] = useState([]);
  useEffect(() => {
    console.log(appMode);
    setAppMode(mode === "dark" ? classes.mode : "");
  }, [mode]);
  useEffect(() => {
    setPersoneldata(dataFromApi.personnel);
  }, []);
  useEffect(() => {
    personeldata?.length > 0 && getGradePourcent();
    personeldata?.length > 0 && getBmi();
    personeldata?.length > 0 && getBase();
  }, [personeldata]);

  const [gradeCategory, setGradeCategory] = useState([]);
  const [ageCategory, setageCategory] = useState([]);
  const [typeFunction, setTypeFunction] = useState([]);
  const [bmiData, setBmiData] = useState(null);
  const [base, setBase] = useState();

  const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  console.log(base);
  const getGradePourcent = () => {
    setGradeCategory({
      category: ["ضباط", "ضباط صف", "رجال جيش"],
      data: [
        personeldata?.filter((item) => item?.grade_cat === "ضباط").length,
        personeldata?.filter((item) => item?.grade_cat === "ضابط صف").length,
        personeldata?.filter((item) => item?.grade_cat === "رجال جيش").length,
      ],
    });

    setageCategory({
      category: ["ص", "ه", "د", "ب", "أ"],
      data: [
        personeldata?.filter((item) => item?.type_age === "أ").length,
        personeldata?.filter((item) => item?.type_age === "ب").length,
        personeldata?.filter((item) => item?.type_age === "د").length,
      ],
    });
    setTypeFunction({
      category: ["عملياتي", "إداري"],
      data: [
        personeldata?.filter((item) => item?.type_fonction === "إداري").length,
        personeldata?.filter((item) => item?.type_fonction === "عملياتي")
          .length,
      ],
    });
  };

  const getBmi = () => {
    var bmiByBasePersonel = groupBy(personeldata, "base");
    console.log(bmiByBasePersonel);
    let bmiBase = Object.keys(bmiByBasePersonel);
    let bmiMoyene = {
      category: [],
      data: [],
    };
    console.log(bmiByBasePersonel);
    bmiBase?.forEach((item) => {
      let total = 0;
      console.log(bmiByBasePersonel[item].length);
      bmiByBasePersonel[item]?.forEach((item) => {
        total += item.bmi_moyen;
      });
      bmiMoyene.category.push(item);
      bmiMoyene.data.push(total / bmiByBasePersonel[item].length);
    });

    setBmiData(bmiMoyene);
  };

  const getBase = () => {
    setBase(personeldata?.map((item) => item.base));
  };

  return (
    <Row gutter={[30, 30]} className="custom-space">
      <Col span={24}>
        {/* onChange={(e) => setisOnTopPosition(e)} */}
        <Typography.Title
          level={3}
          className={"appTitle"}
          // style={{ color: isOnTopPosition ? "#fff" : "#000" }}
        >
          <FcBarChart size={35} /> إحصائيات عامة
        </Typography.Title>
      </Col>

      <Col span={6}>
        <Statistic
          title="العدد الجملي"
          value={1128}
          prefix={<UserOutlined />}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="التأهيلات الرياضية"
          value={1128}
          prefix={<UserOutlined />}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="الإعفاءات الوقتية"
          value={93}
          suffix="/ 100"
          prefix={<UserOutlined />}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="الإعفاءات النهائية"
          value={93}
          suffix="/ 100"
          prefix={<UserOutlined />}
        />
      </Col>

      <Col span={24}>
        {/* <DashFliterZone /> */}

        <span>
          <Select
            placeholder="حسب القواعد"
            style={{ width: 200, margin: "0 8px" }}
            onChange={(e) => console.log(e)}
          >
            {base?.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="حسب الوحدات"
            style={{ width: 150, margin: "0 8px" }}
          ></Select>
        </span>
      </Col>
      <Col span={8}>
        <Card
          title="الأصناف العمرية"
          style={{ width: "100%" }}
          cover={<PieChart data={ageCategory} />}
        >
          {/* <Meta description="www.instagram.com" /> */}
        </Card>
      </Col>

      <Col span={8}>
        <Card
          title="أصناف الرتب"
          style={{ width: "100%" }}
          cover={<PieChart data={gradeCategory} />}
        >
          {/* <Meta description="www.instagram.com" /> */}
        </Card>
      </Col>

      <Col span={8}>
        <Card
          title="أنواع الخطط"
          hoverable
          style={{ width: "100%" }}
          cover={<PieChart data={typeFunction} />}
        >
          {/* <Meta description="www.instagram.com" /> */}
        </Card>
      </Col>

      <Col span={24}>
        <Card
          title="مؤشر الكتلة البدنية"
          hoverable
          style={{ width: "100%" }}
          cover={<LineBar bmiData={bmiData} />}
        >
          {/* <Meta description="www.instagram.com" /> */}
        </Card>
      </Col>

      {/* <Col span={12}>
        <Card
          title="Europe Street beat"
          hoverable
          style={{ width: "100%" }}
          cover={<PieChart />}
        >
          <Meta description="www.instagram.com" />
        </Card>
      </Col>

      <Col span={12}>
        <Card
          title="Europe Street beat"
          hoverable
          style={{ width: "100%" }}
          cover={<PieChart />}
        >
          <Meta description="www.instagram.com" />
        </Card>
      </Col> */}
    </Row>
  );
};

export default Dashboard;
