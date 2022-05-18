import { Card } from "antd";
import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const DataTables = ({ data, columns }) => {
  const tableData = {
    columns,
    data,
  };
  return (
    <div className="datatablePersonnel">
      <DataTableExtensions {...tableData} print={false} export={false}>
        <DataTable
          loading={true}
          subHeaderAlign="center"
          defaultSortAsc={false}
          pagination
          highlightOnHover
          direction="rtl"
          noHeader
          responsive
          dense
          data={data}
        />
      </DataTableExtensions>
    </div>
  );
};

export default DataTables;
