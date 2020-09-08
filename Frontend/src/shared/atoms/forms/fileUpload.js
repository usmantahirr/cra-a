import React from 'react';
import { Upload, Button } from 'antd';

function CustomUpload({ children, ...props }) {
  return (
    <Upload {...props} className="customUpload">
      <Button>
        <div className="upload-img">
          <img src="/assets/img/upload-files.png" alt=""></img>
        </div>
        <div className="upload-text text-gray">Drag and drop your files here</div>
        <div className="upload-text text-lblue">or</div>
        <div className="upload-text text-blue">Browse your computer</div>
      </Button>
    </Upload>
  );
}

export default CustomUpload;
