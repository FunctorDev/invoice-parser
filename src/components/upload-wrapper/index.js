import React from "react";
import classes from "./upload-wrapper.module.scss";
import { Upload, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { customRequest } from "../../helpers/Upload.helper";

const beforeUpload = (file) => {
  const isPDF = file.type === "application/pdf";
  if (!isPDF) {
    message.error(`${file.name} is not a PDF file`);
  }
  return isPDF || Upload.LIST_IGNORE;
};

const UploadWrapper = ({ handleChangeFileList }) => {
  const showUploadList = {
    showDownloadIcon: false,
    showRemoveIcon: true,
    removeIcon: (
      <DeleteOutlined
        onClick={(e) => console.log(e, "custom removeIcon event")}
      />
    ),
  };

  const handleChange = ({ fileList }) => {
    handleChangeFileList(fileList);
  };

  return (
    <div className={classes.UploadWrapper}>
      <Upload
        accept=".pdf"
        name="avatar"
        customRequest={customRequest}
        showUploadList={showUploadList}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        multiple={true}
      >
        <div className={classes.UploadIconWrap}>
          <div style={{ marginTop: 8, color: "#748DA6" }}>Upload</div>
        </div>
      </Upload>
    </div>
  );
};

export default UploadWrapper;
