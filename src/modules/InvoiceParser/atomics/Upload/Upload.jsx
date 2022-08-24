import React, { useRef } from "react";
import { Upload as AntdUpload, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { debounce } from "throttle-debounce";

import classes from "./styles.module.scss";
import { customRequest } from "../../../../helpers/Upload.helper";

const beforeUpload = (file) => {
  const isPDF = file.type === "application/pdf";

  if (!isPDF) {
    message.error(`${file.name} is not a PDF file`);
  }

  return isPDF || Upload.LIST_IGNORE;
};

const Upload = ({ fileList, handleChangeFileList, handleRemove }) => {
  const showUploadList = {
    showDownloadIcon: false,
    showRemoveIcon: true,
    removeIcon: <DeleteOutlined />,
  };

  const handleUpload = useRef(
    debounce(250, ({ fileList }) => {
      handleChangeFileList(fileList);
    })
  );

  return (
    <div className={classes.UploadWrapper}>
      <AntdUpload
        accept=".pdf"
        name="avatar"
        customRequest={customRequest}
        showUploadList={showUploadList}
        onChange={handleUpload.current}
        onRemove={handleRemove}
        beforeUpload={beforeUpload}
        multiple={true}
        fileList={fileList}
      >
        <div className={classes.UploadIconWrap}>
          <div style={{ color: "#748DA6", margin: '10px 0' }}>Upload</div>
        </div>
      </AntdUpload>
    </div>
  );
};

export default Upload;
