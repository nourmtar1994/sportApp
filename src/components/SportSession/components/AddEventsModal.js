import React from "react";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const AddEventsModal = (form, onFinish, visible, eventNameRef, setVisible) => {
  return (
    <Modal
      footer={false}
      title="إضافة حصة رياضة"
      visible={visible}
      onCancel={() => setVisible(false)}
      width="50%"
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
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

        <Form.Item
          label="الفترة"
          name="periode"
          rules={[{ required: true, message: "فترة حصة الرياضة" }]}
        >
          <RangePicker
            style={{ width: "100%" }}
            ranges={{
              اليوم: [moment(), moment()],
              "هذا الشهر": [moment().startOf("month"), moment().endOf("month")],
              "هذا الأسبوع": [moment().startOf("week"), moment().endOf("week")],
            }}
            // showTime
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            إضافة
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEventsModal;
