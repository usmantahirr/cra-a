import { Form } from 'antd';
import React from 'react';
import {
  CustomDatePicker,
  CustomSelect,
  CustomRadio,
  CustomTextInput,
  CustomPasswordInput,
  CustomCheckbox,
} from '../../atoms/inputs';

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
        return <CustomSelect {...fieldProps} />;
      default:
        return null;
    }
  };

  render() {
    const { label, name, rules, type } = this.props;
    const isCustomComponent = type === 'customComponent';

    return (
      <>
        {!isCustomComponent && (
          <Form.Item label={label} name={name} rules={rules} valuePropName={type === 'checkbox' ? 'checked' : 'value'}>
            {this._renderField(this.props)}
          </Form.Item>
        )}
        {isCustomComponent && this._renderCustomComponent(this.props)}
      </>
    );
  }
}

export default CustomFormItem;
