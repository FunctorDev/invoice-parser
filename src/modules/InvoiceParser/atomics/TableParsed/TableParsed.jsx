import React, { useMemo } from "react";
import { Table } from "antd";
import moment from "moment";
import { CSVLink } from "react-csv";
import { DownloadOutlined } from "@ant-design/icons";
import { propOr } from "ramda";
import { faker } from "@faker-js/faker";

import classes from "./styles.module.scss";

const headers = [
  { label: "Date", key: "date" },
  { label: "Total", key: "total" },
  { label: "Tax", key: "tax" },
  { label: "Company Name", key: "companyName" },
];

export const getCSVName = (filename) => {
  return filename.substring(0, filename.lastIndexOf(".")) || filename;
};

const TableParsed = ({ fileName, job }) => {
  const data = useMemo(() => {
    const companyNameObject =
      job.body.objectsDomain.getObjectByName("companyName");
    const dateIssuedObject =
      job.body.objectsDomain.getObjectByName("dateIssued");
    const totalObject = job.body.objectsDomain.getObjectByName("total");
    const taxObject = job.body.objectsDomain.getObjectByName("tax");

    return [
      {
        uid: faker.datatype.uuid(),
        companyName: propOr("", "value", companyNameObject),
        date: propOr("", "value", dateIssuedObject),
        total: propOr("", "value", totalObject),
        tax: propOr("", "value", taxObject),
      },
    ];
  }, [job]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      render: (date) => <span>{moment(date).format("MM/DD/YYYY")}</span>,
      align: "center",
      width: 300,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => a.total - b.total,
      render: (total) => <span>${total}</span>,
      align: "center",
      width: 200,
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
      sorter: (a, b) => a.tax - b.tax,
      render: (tax) => <span>${tax}</span>,
      align: "center",
      width: 200,
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    },
  ];

  return (
    <div className={classes.TableWrap}>
      <div className={classes.TitleWrap}>
        <div className={classes.Title}>{fileName}</div>
        <CSVLink
          data={data}
          headers={headers}
          filename={`${getCSVName(fileName)}.csv`}
        >
          <div className={classes.DownloadWrap}>
            <span className={classes.DownloadText}>Download CSV</span>{" "}
            <DownloadOutlined className={classes.DownloadIcon} />
          </div>
        </CSVLink>
      </div>

      <div>
        <Table
          pagination={false}
          bordered
          dataSource={data}
          columns={columns}
          rowKey="uid"
        />
      </div>
    </div>
  );
};

export default TableParsed;
