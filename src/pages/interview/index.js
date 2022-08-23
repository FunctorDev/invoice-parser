import React, {useState} from 'react';
import classes from "./interview.module.scss";
import UploadWrapper from "../../components/upload-wrapper";
import TableParsed from "../../components/table-parsed";
import {DownloadOutlined} from "@ant-design/icons";

const Interview = () => {
  const [fileList, setFileList] = useState([]);

  const handleChangeFileList = (list) => {
    setFileList(list);
  }

  return (
    <div className={classes.PageWrap}>
      <div className={classes.UploadWrapper}>
        <div>
          <div className={classes.Title}>
            Invoice Parser
          </div>
          <UploadWrapper handleChangeFileList={handleChangeFileList}/>
        </div>

      </div>

      <div className={classes.Parsed}>
        {fileList.map((item) => (
          <div>
            {item.status ==="done" && (
              <TableParsed fileName={item.name}/>
            )}

            {item.status ==="error" && (
              <div>
                <div className={classes.ErrorTitleWrap}>
                  <div className={classes.ErrorTitle}>
                    {item.name}
                  </div>
                  <div className={classes.DownloadWrap}>
                    <span className={classes.DownloadText}>Download CSV</span> <DownloadOutlined className={classes.DownloadIcon} />
                  </div>
                </div>
                <div className={classes.ErrorText}>
                  <div>No data parsed!</div>
                  Upload is failed. Please upload again
                </div>
              </div>
            )}
          </div>
        ))
        }
      </div>

    </div>
  );
};

export default Interview;