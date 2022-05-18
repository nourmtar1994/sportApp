import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//SERVICES
import axios from "axios";
//APP COMPONENTS
import Personnel from "../Personnel/Personnel";
import WeiredCard from "../WeiredCard/WeiredCard";
import SportSession from "../SportSession/SportSession";
//ANT DESIGN COMPONENTS
import { Card, notification, Typography } from "antd";
//CSS FILES
import * as classes from "./Home.module.css";
import Dashboard from "../Dashboard/Dashboard";
import { fetchPersonnel } from "../../redux/PersonnelSlice";
//ICONS
import { FcConferenceCall } from "react-icons/fc";
import Banner from "../Banner/Banner";

const { Text } = Typography;

const Home = () => {
  const dispatch = useDispatch();
  const [personnelData, setPersonnelData] = useState([]);
  const [selectedUnite, setSelectedUnite] = useState(null);
  const [baseData, setBaseData] = useState([]);
  const mode = useSelector((state) => state.mode.value);

  const personnel = useSelector((state) => state.personnel);
  // const getBase = async () => {
  //   try {
  //     const base = await axios.get("/base");
  //     setBaseData(base.data);
  //     console.log(base.data);
  //   } catch (error) {
  //     notification.error({
  //       message: "ERROR",
  //       description: labeRender(error),
  //       className: classes.notification,
  //     });
  //   }
  // };
  useEffect(() => {
    dispatch(fetchPersonnel(123));
    // getBase();
  }, []);

  useEffect(() => {
    setPersonnelData(personnel);
  }, [personnel]);

  const getPersonnelByUnite = (unite) => {
    setPersonnelData(personnel);
    console.log(unite._id);
    let newPersonelData = personnel.data.filter((el) => el.UNITE === unite._id);
    setSelectedUnite(unite.Lib_Unite);

    if (newPersonelData.length > 0) {
      setPersonnelData({ ...personnelData, data: newPersonelData });
      notification.success({
        message: "بيانات موجودة",
        description: labeRender(unite.Lib_Unite, "success"),
        className: classes.notification,
      });
    } else {
      setPersonnelData({});
      notification.error({
        message: "لا يوجد بيانات",
        description: labeRender(unite.Lib_Unite, "danger"),
        className: classes.notification,
      });
    }
  };

  const labeRender = (unite, type) => {
    let msg =
      type === "success" ? "الأفراد التابعة ل" : "لا يوجد أفراد تابعين ";
    return (
      <Text type={[type]}>
        <label style={{ color: "#fff" }}>{msg}</label>
        {unite}
      </Text>
    );
  };

  return (
    <div className={mode}>
      <Banner />
      <div style={{ width: "100%", margin: "auto", padding: "20px" }}></div>
      <Dashboard data={personnelData.data} />
    </div>
  );
};

export default Home;
