import React, { useEffect } from "react";
//APP COMONENTS
import DataTables from "../DataTables/DataTables";
//ANT DESIGN COMPONENTS
import { Card, Col, Row, Select, Typography } from "antd";
const { Title } = Typography;
const { Option } = Select;

const columns = [
  {
    name: "NAME",
    selector: () => "name",
    sortable: true,
    cell: (d) => <span>{d.name}</span>,
  },
  {
    name: "SIZE",
    selector: () => "size",
    sortable: true,
    cell: (d) => <span>{d.size}</span>,
  },
  {
    name: "UPSIDE",
    selector: () => "upside",
    sortable: true,
    cell: (d) => <span>{d.upside}</span>,
  },
  {
    name: "WINSCORE",
    selector: () => "winscore",
    cell: (d) => <span>{d.winscore}</span>,
    sortable: true,
  },
  {
    name: "STAGE",
    selector: () => "stage",
    cell: (d) => <span>{d.stage}</span>,
    sortable: true,
  },
  {
    name: "C-DATE",
    selector: () => "close_date",
    cell: (d) => <span>{d.close_date}</span>,
    sortable: true,
  },
  {
    name: "AI C-DATE",
    selector: () => "ai_close_date",
    cell: (d) => <span>{d.ai_close_date}</span>,
    sortable: true,
  },
  {
    name: "NEXT BEST ACTION",
    selector: () => "next_best_action",
    cell: (d) => <span>{d.next_best_action}</span>,
    sortable: true,
  },
  //   {
  //     name: "insights",
  //     selector: () => "insights",
  //     cell: (d) => <span>{d.insights}</span>,
  //     sortable: true,
  //   },
];

const data = [
  {
    name: "H&M",
    sales_person: "",
    size: "$ 100.000",
    upside: "$ 30.000",
    winscore: "%78",
    stage: "6",
    close_date: "30 Jan 2022",
    ai_close_date: "30 Jan 2022",
    next_best_action: "Confirm budget",
    insights: {
      actions: ["", "", ""],
      signals: ["", "", ""],
    },
    opp_forecast: ["very risky", "risky", "healthy", "solid"],
    opp_progress: ["Fast", "steady", "Slow"],
    qualification: ["Metrics, ... and other categories"],
  },
];
const Actions = () => {
  return (
    <Row gutter={[30, 15]}>
      <Col xs={{ span: 24 }}>
        <Title level={4}>Actions</Title>
        <Card
          title="Actions List"
          loading={false}
          title="Actions List"
          loading={false}
          extra={
            <>
              <Select
                allowClear
                showSearch
                placeholder="Sales"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
              &nbsp; &nbsp;
              <Select
                allowClear
                showSearch
                placeholder="Customer"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </>
          }
        >
          <DataTables columns={columns} data={data} />
        </Card>
      </Col>
    </Row>
  );
};
export default Actions;
