/* eslint-disable jsx-a11y/label-has-for */

import React, { Fragment, useState, useEffect } from 'react';
import IntlTelInput from 'react-intl-tel-input';

import 'react-intl-tel-input/dist/main.css';

const CustomTelInput = ({ onChange, placeholder, label, required, id, value: fieldValue }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (fieldValue) setInputValue(fieldValue);
  }, [fieldValue]);

  const triggerChange = changedValue => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const validateInput = (valid, value, countryObject, formattedValue) => {
    if (valid && value && !formattedValue) {
      triggerChange(value);
    } else if (!valid && !value) {
      triggerChange(null);
    } else if (valid && value && formattedValue) {
      triggerChange(formattedValue.replace(/\s/g, ''));
    } else {
      triggerChange(false);
    }
  };

  const onNumberChange = (valid, value, countryObject, formattedValue) => {
    validateInput(valid, value, countryObject, formattedValue);
  };

  const onNumberBlur = (valid, value, countryObject, formattedValue) => {
    validateInput(valid, value, countryObject, formattedValue);
  };

  const onCountryChanged = (value, countryObject, formattedValue, valid) => {
    validateInput(valid, value, countryObject);
  };

  return (
    <Fragment>
      {label && (
        <div className="ant-form-item-label">
          <label htmlFor={id} className={required && 'ant-form-item-required'}>
            {label}
          </label>
        </div>
      )}
      <IntlTelInput
        fieldId={id}
        placeholder={placeholder || 'Mobile Number'}
        preferredCountries={['ae']}
        onPhoneNumberChange={onNumberChange}
        onPhoneNumberBlur={onNumberBlur}
        onSelectFlag={onCountryChanged}
        format
        defaultValue={inputValue}
        nationalMode={false}
        telInputProps={{
          onKeyPress: event => {
            const regex = /^[+0-9]*$/;
            if (event.charCode === 13) return true;
            const test = new RegExp(regex).test(event.key);
            if (!test) {
              event.preventDefault();
              return false;
            }
            return true;
          },
        }}
      />
    </Fragment>
  );
};

export default CustomTelInput;
