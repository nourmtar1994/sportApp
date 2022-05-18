import React, { useEffect, useRef, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./components/event-utils";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  List,
  Badge,
  Affix,
  Typography,
  Divider,
  Radio,
  Switch,
} from "antd";
import moment from "moment";
import {
  ZoomOutOutlined,
  CalendarOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { getDate } from "../Services/Extra";
import { useSelector } from "react-redux";
import axios from "axios";
import MiniBanner from "../MiniBanner/MiniBanner";

const { RangePicker } = DatePicker;

const DemoApp = () => {
  const mode = useSelector * ((state) => state.mode.value);

  const calendarRef = React.createRef();
  const eventNameRef = useRef(null);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [CalendarApi, setCalendarApi] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const [isOnTopPosition, setisOnTopPosition] = useState(false);

  // const handleWeekendsToggle = () => {
  //   setWeekendsVisible(!weekendsVisible);
  // };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const handleDateSelect = (selectInfo) => {
    setVisible(!visible);
    setCalendarApi(selectInfo);

    form.setFieldsValue({
      periode: [
        moment(selectInfo.startStr, "YYYY/MM/DD"),
        moment(selectInfo.endStr, "YYYY/MM/DD"),
      ],
    });
    eventNameRef.current.focus();
  };
  const HandleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    setLoading(true);

    try {
      const events = await axios.get("/planification");
      if (events) {
        setEvents(events.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEventClick = async ({ event }) => {
    console.log(event);
    const id =
      event._def.publicId !== ""
        ? event._def.publicId
        : event._def.extendedProps._id;
    try {
      const deleted = await axios.delete("/planification/" + id);
      if (deleted) {
        event.remove();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    let calendarApi = CalendarApi.view.calendar;
    calendarApi.unselect(); // clear date selection
    setPostLoading(true);

    const data = {
      title: values.name,
      start: values.periode[0]._d,
      end: values.periode[1]._d,
      allDay: CalendarApi.allDay,
      color: values.color,
    };
    console.log(data);
    try {
      const dataToPost = await axios.post("/planification", data);
      data.id = dataToPost.data._id;
      calendarApi.addEvent(data);
      setPostLoading(false);
      setVisible(false);
      getEvents();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    form.setFieldsValue({
      name: "",
      periode: "",
    });
  };

  return (
    <>
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
                الحصص الرياضية
              </Typography.Title>
            </Affix>
          </Col>
          <Divider />
          <Col span={24}>
            {fullScreen ? (
              <Card
                extra={<ZoomOutOutlined onClick={() => HandleFullScreen()} />}
                loading={loading}
                title={
                  <>
                    <OrderedListOutlined /> قائمة الحصص الرياضية
                  </>
                }
              >
                <List
                  itemLayout="horizontal"
                  dataSource={currentEvents}
                  renderItem={(item) => (
                    <Badge.Ribbon color={"pink"}>
                      <List.Item
                        autoCapitalize
                        color={item.title}
                        actions={<span>edit</span>}
                      >
                        <List.Item.Meta
                          title={<a href="https://ant.design">{item.title}</a>}
                          description={
                            <>
                              من <b>{getDate(item.start)} </b> إلى{" "}
                              <b> {getDate(item.end, "YYYY-MM-DD")}</b>
                            </>
                          }
                        />
                      </List.Item>
                    </Badge.Ribbon>
                  )}
                />
              </Card>
            ) : (
              <Card
                loading={loading}
                title={
                  <>
                    <CalendarOutlined /> رزنامة الحصص الرياضية
                  </>
                }
                extra={<ZoomOutOutlined onClick={() => HandleFullScreen()} />}
                style={{ position: "sticky" }}
              >
                <FullCalendar
                  eventResize={(e) => console.log(e)}
                  ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  initialView="dayGridMonth"
                  events={events}
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  weekends={weekendsVisible}
                  // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                  select={(e) => handleDateSelect(e)}
                  // eventContent={(event) => renderEventContent(event)} // custom render function
                  eventClick={(clickInfo) => handleEventClick(clickInfo)}
                  eventsSet={(events) => handleEvents(events)} // called after events are initialized/added/changed/removed
                  /* you can update a remote database when these fire: */
                  // eventAdd={(event) => console.log(event)}
                  // eventChange={function(){}}
                  // eventRemove={function(){}}
                />
              </Card>
            )}
          </Col>
        </div>
      </Row>

      <Modal
        footer={false}
        title="إضافة حصة رياضة"
        visible={visible}
        onCancel={() => setVisible(false)}
        width="fit-content"
      >
        <Form
          layout="vertical"
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="حصة الرياضة"
            name="name"
            rules={[{ required: true, message: "عنوان حصة الرياضة" }]}
          >
            <Input
              ref={eventNameRef}
              autoFocus
              type={"text"}
              placeholder="حصة الرياضة"
            />
          </Form.Item>
          {/* {
            form.getFieldValue("periode") &&
              form
                .getFieldValue("periode")[1]
                .diff(form.getFieldValue("periode")[0], "days") > 7 ? 
                "more"
          } */}

          <Form.Item
            label="الفترة"
            name="periode"
            rules={[{ required: true, message: "فترة حصة الرياضة" }]}
            // initialValue={selectedDate}
          >
            <RangePicker
              style={{ width: "100%" }}
              ranges={{
                اليوم: [moment(), moment()],
                "هذا الشهر": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
                "هذا الأسبوع": [
                  moment().startOf("week"),
                  moment().endOf("week"),
                ],
              }}
              // showTime
              format="YYYY-MM-DD"
            />
          </Form.Item>

          <Form.Item
            label="برمجة الحصة"
            name="periodique"
            rules={[{ required: true, message: "فترة حصة الرياضة" }]}
            // initialValue={selectedDate}
          >
            <Switch
              checkedChildren={"أسبوعية"}
              defaultChecked
              onChange={(e) => console.log(e)}
            />
          </Form.Item>
          <Form.Item
            label="اللون"
            name="color"

            // initialValue={selectedDate}
          >
            <Radio.Group defaultValue="a">
              <Radio.Button
                style={{ background: "red" }}
                value="red"
              ></Radio.Button>
              <Radio.Button
                style={{ background: "green" }}
                value="green"
              ></Radio.Button>
              <Radio.Button
                style={{ background: "pink" }}
                value="pink"
              ></Radio.Button>
              <Radio.Button
                style={{ background: "orange" }}
                value="orange"
              ></Radio.Button>
              <Radio.Button
                style={{ background: "cyan" }}
                value="cyan"
              ></Radio.Button>
              <Radio.Button
                style={{ background: "blue " }}
                value="blue "
              ></Radio.Button>
              <Radio.Button
                style={{ background: "lime" }}
                value="lime"
              ></Radio.Button>
              <Radio.Button
                style={{ background: "purple" }}
                value="purple"
              ></Radio.Button>
              <Radio.Button
                style={{ background: "magenta" }}
                value="magenta"
              ></Radio.Button>
              <Radio.Button
                style={{ background: "gold" }}
                value="gold"
              ></Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={postLoading}
            >
              إضافة
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DemoApp;
