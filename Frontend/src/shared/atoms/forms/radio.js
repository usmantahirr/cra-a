import { Radio } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslation } from '../../utilities/index';

function CustomRadio({ options, ...props }) {
  const { t } = useTranslation();
  return (
    <Radio.Group className="ant-radio-lg ant-radio-center" {...props}>
      {options &&
        options.map(option => (
          <Radio key={option.id} value={option.value}>
            {getTranslation(option.text, t)}
          </Radio>
        ))}
    </Radio.Group>
  );
}

export default CustomRadio;
