import { Form } from 'antd';
import React from 'react';
import {
  CustomDatePicker,
  CustomSelect,
  CustomRadio,
  CustomTextInput,
  CustomPasswordInput,
  CustomCheckbox,
  CustomUpload,
  CustomPlainTextInput,
  CustomNumberInput,
  CustomTextAreaInput,
} from '../../atoms/forms';
import { RadioGroup } from '../../atoms/radio/index';
// import ImageRadio from '../../molecules/imageRadio/index';

import TestNickName from '../../molecules/relatedFormFields/testNickName';
import CountryStateCity from '../../molecules/relatedFormFields/countryStateCity';
import PassengerAndVisaType from '../../molecules/relatedFormFields/passengerAndVisaType';
import TermsAndConditions from '../../molecules/termsAndConditions';
import ReviewApplication from '../../organisms/reviewApplication';
import LabSelection from '../../organisms/labSelection';
import ImgRadioCarusol from '../../molecules/imgRadioCarusol/carusol';
import PaymentContainer from '../payment/container';

const CustomFormItem = props => {
  const _renderField = fieldProps => {
    const fieldType = fieldProps.type || '';

    switch (fieldType) {
      case 'date':
        return <CustomDatePicker {...fieldProps} />;
      case 'select':
        return <CustomSelect {...fieldProps} />;
      case 'radio':
        return <CustomRadio {...fieldProps} />;
      case 'radioGroup':
        return <RadioGroup {...fieldProps} />;
      case 'imageRadio':
        return <ImgRadioCarusol {...fieldProps} />;
      case 'text':
        return <CustomTextInput {...fieldProps} />;
      case 'password':
        return <CustomPasswordInput {...fieldProps} />;
      case 'checkbox':
        return <CustomCheckbox {...fieldProps} />;
      case 'plainText':
        return <CustomPlainTextInput {...fieldProps} />;
      case 'number':
        return <CustomNumberInput {...fieldProps} />;
      case 'textArea':
        return <CustomTextAreaInput {...fieldProps} />;
      default:
        return null;
    }
  };

  const _renderCustomComponent = (fieldProps, applicationFormData, applicationId, setApplicationFormData) => {
    const componentName = fieldProps.name || '';

    switch (componentName) {
      case 'countryCity':
        return <CustomDatePicker {...fieldProps} />;
      case 'testNickName':
        return <TestNickName {...fieldProps} />;
      case 'fileUpload':
        return <CustomUpload applicationFormData={applicationFormData} {...fieldProps} />;
      case 'countryStateCity':
        return (
          <CountryStateCity
            applicationFormData={applicationFormData}
            setApplicationFormData={setApplicationFormData}
            {...fieldProps}
          />
        );
      case 'passengerAndVisaType':
        return <PassengerAndVisaType {...fieldProps} />;
      case 'termsAndConditions':
        return <TermsAndConditions {...fieldProps} />;
      case 'reviewApplication':
        return <ReviewApplication {...fieldProps} />;
      case 'googleMapComponent':
        return <LabSelection {...fieldProps} />;
      case 'paymentModule':
        return <PaymentContainer {...fieldProps} applicationId={applicationId} />;

      default:
        return null;
    }
  };

  const isHidden = (hideField, applicationFormData) => {
    let hidden = false;

    if (!hideField) {
      return false;
    }

    hideField.forEach(field => {
      const { fieldName } = field;
      const { fieldValue } = field;
      const { isEqual } = field;

      Object.keys(applicationFormData).forEach(formField => {
        if (isEqual && fieldName === formField && fieldValue === applicationFormData[formField]) {
          hidden = true;
        } else if (!isEqual && fieldName === formField && fieldValue !== applicationFormData[formField]) {
          hidden = true;
        }
      });
    });

    return hidden;
  };

  const { label, name, rules, type } = props;
  const { hideField, applicationFormData, setApplicationFormData, applicationId, ...restOfProps } = props;
  const isCustomComponent = type === 'customComponent';

  return (
    <>
      {!isCustomComponent && !isHidden(hideField, applicationFormData) && (
        <Form.Item
          // hidden={isHidden(hideField, applicationFormData)}
          label={label}
          className="custom-item"
          name={name}
          rules={rules}
          valuePropName={type === 'checkbox' ? 'checked' : 'value'}
        >
          {_renderField(restOfProps)}
        </Form.Item>
      )}
      {isCustomComponent && _renderCustomComponent(props, applicationFormData, applicationId, setApplicationFormData)}
    </>
  );
};

export default CustomFormItem;
