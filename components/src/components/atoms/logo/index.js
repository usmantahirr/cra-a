import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';

const Logo = ({ href, src, title }) => (
  <a className="app-link" href={href} rel="noopener noreferrer" title={title}>
    <Image src={src} className="logo-holder" alt={title} />
  </a>
);

Logo.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

Logo.defaultProps = {
  href: '/'
};

export default Logo;
