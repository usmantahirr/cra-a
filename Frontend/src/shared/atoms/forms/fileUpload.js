import React, { useState, useEffect } from 'react';
import { Form, Upload, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import Button from '../buttons';
import uploadService from '../../../modules/dashboard/services/upload.service';
import CustomSpinner from '../spinner';

function CustomUpload({ name, applicationFormData, ...props }) {
  const [fileList, updateFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const allowedExtensions = ['pdf', 'png', 'jpeg', 'jpg'];

  useEffect(() => {
    if (applicationFormData.fileUpload && applicationFormData.fileUpload.fileList)
      updateFileList([...applicationFormData.fileUpload.fileList]);
  }, []);

  const allowedFileExtension = fileName => {
    const splittedArray = fileName.split('.');
    const extension = splittedArray[splittedArray.length - 1];
    return allowedExtensions.every(a => extension.toLowerCase() !== a);
  };

  const onFileChange = async uploader => {
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
      const uploadFile = uploader.fileList[0];
      uploadFile.path = `${uuidv4()}-${uploadFile.name}`;
      const payload = {
        fileNames: [uploadFile.path],
      };
      try {
        setLoading(true);
        const blobResponse = await uploadService.createBlob(payload);
        if (blobResponse && blobResponse.data) {
          const blob = blobResponse.data[0];
          const uploadResponse = await uploadService.uploadFile(uploadFile.originFileObj, blob.sharedAccessLink);
          if (uploadResponse.status === 201) {
            updateFileList([uploadFile]);
          } else {
            uploader.fileList.pop();
            updateFileList([...uploader.fileList]);
          }
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        uploader.fileList.pop();
        updateFileList([...uploader.fileList]);
      }
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
    <div style={{ textAlign: 'center' }}>
      {loading && <CustomSpinner />}
      {
        <Form.Item
          name="fileUpload"
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
      }
    </div>
  );
}

export default CustomUpload;
