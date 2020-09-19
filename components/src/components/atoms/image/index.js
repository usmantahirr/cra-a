import React from 'react';
import PropTypes from 'prop-types';
import { Image as AntImage } from 'antd';

const Image = ({ src, alt, ...props }) => {
  return <AntImage src={src} alt={alt} {...props} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};

Image.defaultProps = {
  alt: ''
};

export default Image;
