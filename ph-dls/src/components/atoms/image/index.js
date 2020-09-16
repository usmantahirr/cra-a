import React from 'react';
import { Image as AntImage } from 'antd';

const Image = ({ src, alt, ...props }) => {
  return <AntImage src={src} alt={alt} {...props} />;
};

export default Image;
