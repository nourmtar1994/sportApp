import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Collapse,
  Statistic,
  Card,
  Select,
  Switch,
  notification,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
//IMAGES
import abdominale from "../../assets/images/activite-sportif/abdominale.gif";
import pompe from "../../assets/images/activite-sportif/pompe.gif";
import running from "../../assets/images/activite-sportif/running.gif";
import { useSelector } from "react-redux";
import { useAxios } from "../Services/Axios";
import axios from "axios";
import { data } from "../../charts/LineBar/LineBar";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */
const { Panel } = Collapse;
const { Option } = Select;

export const PersonnelEdit = ({ visible, setIsModalVisible, data }) => {
  const [bmiValue, setBmiValue] = useState(0);
  const [sportSeance, setSportSeance] = useState(null);
  const [personneMesure, setPersonneMesure] = useState({ poids: 0, taille: 0 });
  const [testEdit, setTestEdit] = useState(true);
  const [submitBtn, setSubmitBtn] = useState(true);
  const mode = useSelector((state) => state.mode.value);

  useEffect(() => {
    getSportSeance();
  }, []);

  useEffect(() => {
    if (personneMesure.poids > 0 && personneMesure.taille) {
      setBmiValue(
        personneMesure.poids / (personneMesure.taille * personneMesure.taille)
      );
    } else {
      setBmiValue(0);
    }
  }, [personneMesure]);

  const saveSportTest = async (values) => {
    const dataToInsert = {
      note_pompe: values.personne.note_pompe,
      note_abdominale: values.personne.note_abdominale,
      note_dbl_maille: values.personne.note_dbl_maille,
      modele8: values.personne.modele8,
    };

    try {
      const response = await axios.put(
        "/sportinfo/" + data.sportinfo._id,
        dataToInsert
      );
      notification.success({
        message: "success",
        placement: "topLeft",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSportSeance = async () => {
    try {
      const { data } = await axios.get("planification");
      if (data.success) {
        console.log(data.data);
        setSportSeance(data.data);
      }
    } catch (error) {
      notification.error({
        message: "error",
        placement: "topLeft",
      });
    }
  };

  const savePhyPersonelInfo = async (values) => {
    try {
      const response = await axios.put("/sportinfo/" + data.sportinfo._id, {
        taille: values.personne.taille,
        poids: values.personne.poids,
      });
      notification.success({
        message: "success",
        placement: "topLeft",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={
        <>
          <EditOutlined /> {data && data.prenom + " " + data.nom}
        </>
      }
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      className={mode}
    >
      <Collapse collapsible="header" defaultActiveKey={["1"]} ghost accordion>
        <Panel
          header="المعطيات الأنتروبومترية"
          key="1"
          extra={<EditOutlined />}
        >
          <Form
            {...layout}
            name="sport-test"
            onFinish={savePhyPersonelInfo}
            validateMessages={validateMessages}
          >
            <Form.Item name={["personne", "taille"]} label="الطول (م)">
              <InputNumber
                defaultValue={(data && data.sportinfo.taille) || 0}
                value={personneMesure.taille}
                placeholder="الطول"
                style={{ width: "100%" }}
                onChange={(value) =>
                  setPersonneMesure({ ...personneMesure, taille: value })
                }
              />
            </Form.Item>

            <Form.Item name={["personne", "poids"]} label="الوزن (كغ)">
              <InputNumber
                defaultValue={(data && data.sportinfo.poids) || 0}
                value={personneMesure.poids}
                placeholder="الوزن"
                style={{ width: "100%" }}
                onChange={(value) =>
                  setPersonneMesure({ ...personneMesure, poids: value })
                }
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                تسجيل
              </Button>
            </Form.Item>
          </Form>
          <Card align="center" draggable>
            <Statistic
              title="مؤشر الكتلة الحجمية (BMI)"
              value={
                bmiValue === 0
                  ? "الرجاء إدخال الطول و الوزن  لحساب مؤشر الكتلة الحجمية (BMI) "
                  : bmiValue
              }
              precision={2}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Panel>

        <Panel header="الحصص الرياضية" key="2" extra={<EditOutlined />}>
          <Form.Item name={["personne", "typeSeance"]} label="نوع الحصص ">
            <Select
              placeholder="الحصة الرياضية"
              showSearch
              showArrow
              allowClear
            >
              {sportSeance?.map((item, i) => (
                <Option key={i} value={item.title}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Panel>

        <Panel
          header="نتيجة الإختبار"
          key="3"
          extra={<EditOutlined onClick={() => setTestEdit(!testEdit)} />}
        >
          <Form
            {...layout}
            name="sport-test"
            onFinish={saveSportTest}
            validateMessages={validateMessages}
            onChange={() => setSubmitBtn(false)}
          >
            <Form.Item
              name={["personne", "note_pompe"]}
              label="مد و عطف الذراعين"
              rules={[{ type: "number", min: 0, max: 20 }]}
              tooltip={<img width={100} height={100} src={pompe} />}
            >
              <InputNumber
                defaultValue={(data && data.sportinfo.note_pompe) || 0}
                disabled={testEdit}
                placeholder="العدد"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name={["personne", "note_abdominale"]}
              label="حركات الجوف"
              rules={[{ type: "number", min: 0, max: 20 }]}
              tooltip={<img width={100} height={100} src={abdominale} />}
            >
              <InputNumber
                defaultValue={(data && data.sportinfo.note_abdominale) || 0}
                disabled={testEdit}
                placeholder="العدد"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name={["personne", "note_dbl_maille"]}
              label="سباق 2 مايل"
              rules={[{ type: "number", min: 0, max: 20 }]}
              tooltip={<img width={100} height={100} src={running} />}
            >
              <InputNumber
                defaultValue={(data && data.sportinfo.note_dbl_maille) || 0}
                disabled={testEdit}
                placeholder="العدد"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              initialValue={data && data.modele8}
              name={["personne", "modele8"]}
              label="أنموذج 8"
            >
              <Switch
                defaultValue={(data && data.sportinfo.modele8) || 0}
                onChange={(e) => console.log(e)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={testEdit ? testEdit : submitBtn}
                type="primary"
                htmlType="submit"
                block
              >
                تسجيل
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <br></br>
    </Modal>
  );
};
