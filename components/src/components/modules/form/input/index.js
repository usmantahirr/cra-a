import React from 'react';

import './style.scss';

const Input = ({ text, onChange, ...props }) => {
  return (
    <input className="phs-input" onChange={onChange} {...props}>
      {text}
    </input>
  );
};

export default Input;
