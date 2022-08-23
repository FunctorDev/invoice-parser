import React, {useState} from 'react';
import classes from "./upload-wrapper.module.scss";
import {  Upload, message } from 'antd';
import {LoadingOutlined, PlusOutlined, DeleteOutlined} from '@ant-design/icons';

const UploadWrapper = ({handleChangeFileList}) => {
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file) => {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error(`${file.name} is not a PDF file`);
    }
    return isPDF || Upload.LIST_IGNORE;
  }

  const handleChange = ({ file, fileList }) => {
    handleChangeFileList(fileList);
    if (file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (file.status !== 'uploading') {
      setLoading(false);
      console.log(file, fileList);
    }
  };

  const showUploadList = {
    showDownloadIcon: false,
    showRemoveIcon: true,
    removeIcon: <DeleteOutlined onClick={e => console.log(e, 'custom removeIcon event')} />,
  }

  return (
    <div className={classes.UploadWrapper}>
      <Upload
        accept=".pdf"
        name="avatar"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        className="avatar-uploader"
        showUploadList={showUploadList}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        multiple={true}
      >
        <div className={classes.UploadIconWrap}>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8,  color: '#748DA6'}}>Upload</div>
        </div>
      </Upload>
    </div>
  );
};

export default UploadWrapper;