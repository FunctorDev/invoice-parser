import React, { useMemo, useState } from "react";
import { notification, Spin } from "antd";
import { pluck } from "ramda";

import {
  actions as InvoiceParserActions,
  selectors as InvoiceParserSelectors,
} from "../../redux/reducers/invoiceParser";
import { useDispatch, useSelector } from "react-redux";
import { showErrorMessageFromServer } from "../../helpers/Request.helper";
import { Upload, TableParsed } from "./atomics";
import classes from "./styles.module.scss";

const InvoiceParser = () => {
  const dispatch = useDispatch();

  const invoices = useSelector(InvoiceParserSelectors.selectInvoices);

  const [isLoading, setIsLoading] = useState(false);

  const fileList = useMemo(() => {
    return pluck("file", invoices);
  }, [invoices]);

  const handleChangeFileList = (files) => {
    setIsLoading(true);

    dispatch(
      InvoiceParserActions.documentParser({
        files,
      })
    )
      .unwrap()
      .then((res) => {
        notification.success({
          message: "Parsing success",
        });
      })
      .catch(showErrorMessageFromServer)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRemoveFileList = (file) => {
    dispatch(
      InvoiceParserActions.removeInvoice({
        uid: file.uid,
      })
    );

    return false;
  };

  return (
    <Spin spinning={isLoading}>
      <div className={classes.PageWrap}>
        <div className={classes.UploadWrapper}>
          <div>
            <div className={classes.Title}>Invoice Parser</div>

            <Upload
              fileList={fileList}
              handleChangeFileList={handleChangeFileList}
              handleRemove={handleRemoveFileList}
            />
          </div>
        </div>

        <div className={classes.Parsed}>
          {invoices.map((invoice) => {
            const file = invoice.file;
            const job = invoice.document.job;

            return (
              <div key={file.uid}>
                <TableParsed fileName={file.name} job={job} />

                {/*{item.status === "error" && (*/}
                {/*  <div>*/}
                {/*    <div className={classes.ErrorTitleWrap}>*/}
                {/*      <div className={classes.ErrorTitle}>{item.name}</div>*/}
                {/*      <div className={classes.DownloadWrap}>*/}
                {/*        <span className={classes.DownloadText}>Download CSV</span>{" "}*/}
                {/*        <DownloadOutlined className={classes.DownloadIcon} />*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*    <div className={classes.ErrorText}>*/}
                {/*      <div>No data parsed!</div>*/}
                {/*      Upload is failed. Please upload again*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*)}*/}
              </div>
            );
          })}
        </div>
      </div>
    </Spin>
  );
};

export default InvoiceParser;
