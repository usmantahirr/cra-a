/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { CustomCheckbox } from '../../atoms/forms/index';
import { getTranslation } from '../../utilities/index';

const TermsAndConditions = ({ name }) => {
  const { t } = useTranslation();

  return (
    <div className="align-center">
      <Form.Item
        className="custom-item"
        name={name}
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error(getTranslation('Should accept agreement', t))),
          },
        ]}
      >
        <CustomCheckbox>
          {getTranslation('I Have Read And Accepted The ', t)}
          <a
            href="https://screening.purehealth.ae/sapi/images/TermsandConditions.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getTranslation('Terms & Conditions', t)}
          </a>
        </CustomCheckbox>
      </Form.Item>
    </div>
  );
};

export default TermsAndConditions;
