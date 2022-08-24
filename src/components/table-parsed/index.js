import React from 'react';
import {Table} from "antd";
import {getCSVName, getRandomTableData} from "../../helpers/get-random-table-data";
import moment from 'moment';
import { CSVLink } from "react-csv";
import {DownloadOutlined} from "@ant-design/icons";
import classes from "./table-parsed.module.scss";

const TableParsed = ({fileName}) => {
  const data = getRandomTableData();
  const headers = [
    { label: "Date", key: "date" },
    { label: "Total", key: "total" },
    { label: "Tax", key: "tax" },
    { label: "Company Name", key: "companyName" }
  ];
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) =>  moment(a.date).unix() - moment(b.date).unix(),
      render: (date) => <span>{moment(date).format("MM/DD/YYYY")}</span>,
      align: "center",
      width: 300
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      sorter: (a, b) => a.total - b.total,
      render: (total) => <span>${total}</span>,
      align: "center",
      width: 200
    },
    {
      title: 'Tax',
      dataIndex: 'tax',
      key: 'tax',
      sorter: (a, b) => a.tax - b.tax,
      render: (tax) => <span>${tax}</span>,
      align: "center",
      width: 200
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    },
  ];

  return (
    <div className={classes.TableWrap}>
      <div className={classes.TitleWrap}>
        <div className={classes.Title}>
          {fileName}
        </div>
        <CSVLink data={data} headers={headers} filename={() => getCSVName(fileName)}>
          <div className={classes.DownloadWrap}>
            <span className={classes.DownloadText}>Download CSV</span> <DownloadOutlined className={classes.DownloadIcon} />
          </div>
        </CSVLink>
      </div>
      <div>
        <Table bordered dataSource={data} columns={columns} />
      </div>
    </div>
  );
};

export default TableParsed;