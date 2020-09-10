import React from 'react';
import Checkbox from '../../atoms/Checkbox/index';

export default ({ options, ...props }) => (
  <div className="ant-checkbox-group ant-checkbox-list">
    {options.map(label => (
      <Checkbox
        key={label}
        label={label}
        disabled={props.disabled}
        handleChange={props.handleChange}
        value={props[label]}
      />
    ))}
  </div>
);
