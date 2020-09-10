/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Form } from 'antd';
import { CustomCheckbox } from '../../atoms/forms/index';

const termsAndConditions = ({ name }) => {
  const renderTermsAndConditions = () => {
    return (
      <div className="align-center">
        <Form.Item
          className="custom-item"
          name={name}
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
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
      </div>
    );
  };

  return renderTermsAndConditions();
};

export default termsAndConditions;
