import React, { useState } from 'react';
import { Form } from 'antd';
import { CustomRadio } from '../../atoms/forms';
import RadioGroupRound from '../../atoms/radio/radioGroupRound';

const PassengerAndVisaType = props => {
  //   console.log('PSVT props ', props);
  const { passengerRules, visaRules, passengerOptions, visaOptions } = props;
  const [passengerType, setPassengerType] = useState(false);

  const onPassengerTypeChange = ({ target: { value } }) => {
    // console.log(value);
    setPassengerType(value);
  };

  const isVisitor = () => {
    return passengerType === '2';
  };

  return (
    <>
      <Form.Item className="custom-item" name="passengerType" rules={passengerRules}>
        <CustomRadio options={passengerOptions} {...props} onChange={onPassengerTypeChange} />
      </Form.Item>
      {isVisitor() && (
        <Form.Item className="custom-item" name="visaType" rules={visaRules}>
          <RadioGroupRound options={visaOptions} {...props} />
        </Form.Item>
      )}
    </>
  );
};

export default PassengerAndVisaType;
