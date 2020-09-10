/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Form } from 'antd';
import { CustomCheckbox } from '../../atoms/forms/index';

const termsAndConditions = ({ name }) => {
  const renderTermsAndConditions = () => {
    return (
      <Form.Item
        className="custom-label"
        name={name}
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
          },
        ]}
      >
        <CustomCheckbox>
          I Have Read And Accepted The{' '}
          <a href="#" onClick={e => e.preventDefault()}>
            Terms & Conditions
          </a>
        </CustomCheckbox>
      </Form.Item>
    );
  };

  return renderTermsAndConditions();
};

export default termsAndConditions;
