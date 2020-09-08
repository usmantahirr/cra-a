import React from 'react';
import { Upload, Button } from 'antd';

function CustomUpload({ children, ...props }) {
  return (
    <Upload {...props} className="customUpload">
      <Button>
        <div>Drag and drop your files here</div>
        <div>Or</div>
        <div>Browse your computer</div>
      </Button>
    </Upload>
  );
}

export default CustomUpload;
