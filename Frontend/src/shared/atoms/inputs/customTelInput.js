import React from 'react';
import IntlTelInput from 'react-intl-tel-input';

import 'react-intl-tel-input/dist/main.css';

const CustomTelInput = ({ onChange }) => {
  const triggerChange = changedValue => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const validateInput = (valid, value, countryObject, formattedValue) => {
    if (!valid && !value) {
      triggerChange(null);
    } else if (valid && value) {
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
    <IntlTelInput
      placeholder="Mobile Number"
      preferredCountries={['ae']}
      onPhoneNumberChange={onNumberChange}
      onPhoneNumberBlur={onNumberBlur}
      onSelectFlag={onCountryChanged}
    />
  );
};

export default CustomTelInput;
