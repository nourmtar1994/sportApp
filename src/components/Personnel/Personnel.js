import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  InfoOutlined,
} from "@ant-design/icons";
import { Affix, Col, Divider, Row, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonnel } from "../../redux/PersonnelSlice";
import DataTables from "../DataTables/DataTables";
import FilterZone from "../FilterZone/FilterZone";
import MiniBanner from "../MiniBanner/MiniBanner";
import { getDate } from "../Services/Extra";
import { PersonnelEdit } from "./PersonnelEdit";
import { dataFromApi } from "../../redux/data";
import PersonnelInfo from "./PersonnelInfo";

const Personnel = (props) => {
  const columns = [
    {
      name: "الرتبة",
      selector: (d) => d.grade,
      sortable: true,
      cell: (d) => <span>{d.grade}</span>,
    },
    {
      name: "الإسم و اللقب",
      selector: (d) => d.prenom,
      sortable: true,
      cell: (d) => <span>{d.prenom + " " + d.nom}</span>,
    },

    {
      name: "تاريخ الولادة",
      selector: (d) => d.date_naissance,
      sortable: true,
      cell: (d) => getDate(d.date_naissance),
    },
    {
      name: "الصنف",
      selector: (d) => d.type,
      cell: (d) => d.type,
      sortable: true,
    },
    {
      name: "أنموذج 8",
      selector: () => "model8",
      cell: (d) => (
        <span>
          {d.model8 ? (
            <CheckCircleOutlined
              style={{ color: "green", fontSize: "1.5em" }}
            />
          ) : (
            <CloseCircleOutlined style={{ color: "red", fontSize: "1.5em" }} />
          )}
        </span>
      ),
      sortable: true,
    },
    {
      name: "المعدل",
      selector: () => "moyen",
      cell: (d) => <span>{d.moyen}</span>,
      sortable: true,
    },
    {
      name: "تحيين",
      selector: () => "moyen",
      cell: (d) => (
        <span>
          {
            <EditOutlined
              onClick={() => setVisible(d)}
              style={{ color: "#07d1ff", fontSize: "1.5em" }}
            />
          }
        </span>
      ),
    },
    {
      name: "معلومات",
      selector: () => "moyen",
      cell: (d) => (
        <span>
          {
            <InfoOutlined
              onClick={() => handleGetEdit(d)}
              style={{ color: "#07d1ff", fontSize: "1.5em" }}
            />
          }
        </span>
      ),
    },
  ];
  const [isOnTopPosition, setisOnTopPosition] = useState(false);
  const [personneInfo, setPersonneInfo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const personnelData = useSelector((state) => state.personnel.data);

  useEffect(() => {
    dispatch(fetchPersonnel());
  }, [props]);

  useEffect(() => {
    setData(personnelData);
    console.log(personnelData);
  }, [personnelData]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleGetEdit = async (personne) => {
    showModal();
    setPersonneInfo(personne);
  };

  const handleFilterData = (filterOption) => {
    console.log(filterOption);
    console.log(personnelData);
    let dataFromApi = props.data;
    //rank filter
    if (filterOption.type === "rank" && filterOption.value) {
      setData(dataFromApi?.filter((el) => el.Grade === filterOption.value));
    }
    //category filter
    if (filterOption.type === "category" && filterOption.value) {
      setData(dataFromApi?.filter((el) => el.categ === filterOption.value));
    }
    //modele 8 filter
    if (filterOption.type === "modele8" && filterOption.value) {
      setData(dataFromApi?.filter((el) => el.modele8 === filterOption.value));
    }

    //reset or empty filter value
    if (!filterOption.value || filterOption.type === "reset ") {
      setData(props.data);
    }
  };
  useEffect(() => {
    console.log(dataFromApi);
  }, [dataFromApi]);

  return (
    <Row>
      <MiniBanner />
      <div className="custom-space">
        <Col span={24}>
          <Affix offsetTop={60} onChange={(e) => setisOnTopPosition(e)}>
            <Typography.Title
              level={2}
              className={"appTitle"}
              style={{ color: isOnTopPosition ? "#fff" : "#000" }}
            >
              الأفراد
            </Typography.Title>
          </Affix>
        </Col>
        <Divider />
        <Col span={20} offset={2}>
          <DataTables columns={columns} data={data} />
        </Col>
      </div>
      <PersonnelInfo />
      <PersonnelEdit
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        data={personneInfo}
      />
    </Row>
  );
};

export default Personnel;
