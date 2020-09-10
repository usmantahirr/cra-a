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
} from '../../atoms/forms';
import { RadioGroup } from '../../atoms/radio/index';
import ImageRadio from '../../molecules/imageRadio/index';

import TestNickName from '../../molecules/relatedFormFields/testNickName';
import CountryStateCity from '../../molecules/relatedFormFields/countryStateCity';
import LabSelection from '../../organisms/labSelection';

class CustomFormItem extends React.PureComponent {
  _renderField = fieldProps => {
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
        return <ImageRadio {...fieldProps} />;
      case 'text':
        return <CustomTextInput {...fieldProps} />;
      case 'password':
        return <CustomPasswordInput {...fieldProps} />;
      case 'checkbox':
        return <CustomCheckbox {...fieldProps} />;
      default:
        return null;
    }
  };

  _renderCustomComponent = fieldProps => {
    const componentName = fieldProps.name || '';

    switch (componentName) {
      case 'countryCity':
        return <CustomDatePicker {...fieldProps} />;
      case 'testNickName':
        return <TestNickName {...fieldProps} />;
      case 'fileUpload':
        return <CustomUpload {...fieldProps} />;
      case 'countryStateCity':
        return <CountryStateCity {...fieldProps} />;
      case 'googleMapComponent':
        return <LabSelection {...fieldProps} />;
      default:
        return null;
    }
  };

  isHidden = (hideField, applicationFormData) => {
    let hidden = false;
    // const { hideField, applicationFormData } = this.props;

    if (!hideField) {
      return false;
    }

    hideField.forEach(field => {
      const { fieldName } = field;
      const { fieldValue } = field;

      Object.keys(applicationFormData).forEach(form => {
        if (Object.prototype.hasOwnProperty.call(applicationFormData, form)) {
          Object.keys(applicationFormData[form]).forEach(formField => {
            if (Object.prototype.hasOwnProperty.call(applicationFormData[form], formField)) {
              if (fieldName === formField && fieldValue === applicationFormData[form][formField]) {
                hidden = true;
              }
            }
          });
        }
      });

      // for (const form in applicationFormData) {
      //   if (Object.prototype.hasOwnProperty.call(applicationFormData, form)) {
      //     for (const formField in applicationFormData[form]) {
      //       if (Object.prototype.hasOwnProperty.call(applicationFormData[form], formField)) {
      //         if (fieldName === formField && fieldValue === applicationFormData[form][formField]) {
      //           hidden = true;
      //         }
      //       }
      //     }
      //   }
      // }
    });

    return hidden;
  };

  render() {
    const { label, name, rules, type } = this.props;
    const { hideField, applicationFormData, ...restOfProps } = this.props;
    const isCustomComponent = type === 'customComponent';

    return (
      <>
        {!isCustomComponent && (
          <Form.Item
            hidden={this.isHidden(hideField, applicationFormData)}
            label={label}
            className="custom-item"
            name={name}
            rules={rules}
            valuePropName={type === 'checkbox' ? 'checked' : 'value'}
          >
            {this._renderField(restOfProps)}
          </Form.Item>
        )}
        {isCustomComponent && this._renderCustomComponent(restOfProps)}
      </>
    );
  }
}

export default CustomFormItem;
