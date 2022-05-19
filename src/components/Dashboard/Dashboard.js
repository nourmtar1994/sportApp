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
import { baseInfo } from "../../redux/data2";
import PieChart from "../../charts/Pie/Pie";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import LineCharts from "../../charts/LineChart/LineCharts";

const { Option } = Select;
const Dashboard = ({ data }) => {
  const mode = useSelector((state) => state.mode.value);
  const [appMode, setAppMode] = useState(mode);
  const [personeldata, setPersoneldata] = useState([]);

  const [gradeCategory, setGradeCategory] = useState([]);
  const [ageCategory, setageCategory] = useState([]);
  const [typeFunction, setTypeFunction] = useState([]);
  const [bmiData, setBmiData] = useState(null);
  const [base, setBase] = useState();
  const [unite, setUnite] = useState();
  const [baseInfoData, setBaseInfoData] = useState([]);

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
    personeldata?.length > 0 && getUnite();
  }, [personeldata]);

  useEffect(() => {
    baseInfo?.length > 0 && setBaseInfoData(baseInfo[0]);
  }, [personeldata]);

  const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

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
        personeldata?.filter((item) => item?.type_age == "أ").length,
        personeldata?.filter((item) => item?.type_age == "ب").length,
        personeldata?.filter((item) => item?.type_age == "د").length,
        personeldata?.filter((item) => item?.type_age == "ه").length,
        personeldata?.filter((item) => item?.type_age == "ص").length,
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
    setBase([...new Set(dataFromApi?.personnel?.map((item) => item.base))]);
  };

  const getUnite = () => {
    setUnite([...new Set(dataFromApi?.personnel?.map((item) => item.unite))]);
  };

  const getBaseInfo = (value) => {
    setBaseInfoData(baseInfo?.filter((item) => item.name === value)[0]);
  };

  const filterPersonnelByBase = (base) => {
    if (base) {
      setPersoneldata(
        dataFromApi?.personnel?.filter((item) => item.base === base)
      );
    } else {
      setPersoneldata(dataFromApi?.personnel);
    }
  };

  const filterPersonnelByUnite = (unite) => {
    if (unite) {
      setPersoneldata(
        dataFromApi?.personnel?.filter((item) => item.unite === unite)
      );
    } else {
      setPersoneldata(dataFromApi?.personnel);
    }
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

      <Col span={24}>
        <Card
          extra={
            <Select
              placeholder="حسب القواعد"
              style={{ width: 200, margin: "0 8px" }}
              onChange={(e) => getBaseInfo(e)}
              defaultValue="القاعدة الجوية بالعوينة"
            >
              {baseInfo?.map((item, index) => (
                <Option value={item.name} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
          }
          title=" معدل الإختبارات الرياضية/مؤشر الكتلة البدنية"
          hoverable
          style={{ width: "100%" }}
          cover={<LineCharts chartData={baseInfoData} />}
        >
          {/* <Meta description="www.instagram.com" /> */}
        </Card>
      </Col>

      <Col span={24}>
        {/* <DashFliterZone /> */}

        <span>
          <Select
            allowClear
            placeholder="حسب القواعد"
            style={{ width: 200, margin: "0 8px" }}
            onChange={(e) => filterPersonnelByBase(e)}
          >
            {base?.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
          <Select
            allowClear
            onChange={(e) => filterPersonnelByUnite(e)}
            placeholder="حسب الوحدات"
            style={{ width: 150, margin: "0 8px" }}
          >
            {unite?.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        </span>
      </Col>
      <Col span={8}>
        <Card
          hoverable
          title="الأصناف العمرية"
          style={{ width: "100%" }}
          cover={<PieChart data={ageCategory} />}
        >
          {/* <Meta description="www.instagram.com" /> */}
        </Card>
      </Col>

      <Col span={8}>
        <Card
          hoverable
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
