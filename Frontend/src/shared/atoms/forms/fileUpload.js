import React, { useState } from 'react';
import { Form, Upload, message } from 'antd';

import Button from '../buttons';

function CustomUpload({ name, ...props }) {
  const [fileList, updateFileList] = useState([]);
  const allowedExtensions = ['pdf', 'png', 'jpeg', 'jpg'];

  const allowedFileExtension = fileName => {
    const splittedArray = fileName.split('.');
    const extension = splittedArray[splittedArray.length - 1];
    return allowedExtensions.every(a => extension.toLowerCase() !== a);
  };

  const onFileChange = uploader => {
    if (uploader.fileList.length > 1) {
      message.error(`Only one file can be uploaded`);
      uploader.fileList.pop();
      updateFileList([...uploader.fileList]);
      return false;
    }
    if (uploader.fileList.length > 0 && uploader.file.size > 20000000) {
      message.error(`${uploader.file.name} must be of maximum 20 MB`);
      uploader.fileList.pop();
      updateFileList([...uploader.fileList]);
      return false;
    }
    if (uploader.fileList.length > 0 && allowedFileExtension(uploader.file.name)) {
      message.error(`${uploader.file.name} is not a png, jpg, jpeg or pfd file`);
      uploader.fileList.pop();
      updateFileList([...uploader.fileList]);
      return false;
    }
    if (uploader.fileList.length > 0) {
      // TODO: Api integration
      const uploadFile = uploader.fileList[0];
      uploadFile.Lala = '000';
      updateFileList([uploadFile]);
    } else {
      if (uploader.file && uploader.file.status === 'removed') {
        // TODO
      }
      updateFileList([]);
    }
    return true;
  };

  const onFileRemove = () => {
    // TODO: Api integration
  };

  const onBeforeUpload = () => {
    return false;
  };

  return (
    <Form.Item
      name={name}
      rules={[
        {
          validator: (_, value) =>
            value && value.fileList && value.fileList.length > 0
              ? Promise.resolve()
              : Promise.reject(new Error('Passport is mandatory!')),
        },
      ]}
    >
      <Upload
        {...props}
        fileList={fileList}
        beforeUpload={onBeforeUpload}
        onChange={onFileChange}
        multiple={false}
        onRemove={onFileRemove}
        accept=".png,.jpg,.jpeg,.pdf"
        className="customUpload"
      >
        <Button>
          <div className="upload-img">
            <img src="/assets/img/upload-files.png" alt="" />
          </div>
          <div className="upload-text text-gray">Drag and drop your files here</div>
          <div className="upload-text text-lblue">or</div>
          <div className="upload-text text-blue">Browse your computer</div>
        </Button>
      </Upload>
    </Form.Item>
  );
}

export default CustomUpload;
