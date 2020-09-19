import React, { Fragment } from 'react';
import { Form, Col } from 'antd';
// import { useTranslation } from 'react-i18next';
import { CustomSelect } from '../forms';

const WeekDaysDropdown = ({ validationRules, label, hideLabel }) => {
  // const { t } = useTranslation();
  const weekDays = [
    {
      key: '1',
      value: 'Monday',
    },
    {
      key: '2',
      value: 'Tuesday',
    },
    {
      key: '3',
      value: 'Wednesday',
    },
    {
      key: '4',
      value: 'Thursday',
    },
    {
      key: '5',
      value: 'Friday',
    },
    {
      key: '6',
      value: 'Saturday',
    },
    {
      key: '7',
      value: 'Sunday',
    },
  ];

  const renderWeekDays = () => {
    return (
      <Col xs={24} md={12}>
        <Form.Item className="custom-item" label={!hideLabel && label} {...validationRules}>
          <CustomSelect
            showSearch
            allowClear
            placeholder={label}
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            options={weekDays.map(c => ({ id: c.key, text: c.value, value: c.value }))}
          />
        </Form.Item>
      </Col>
    );
  };

  return <Fragment>{renderWeekDays()}</Fragment>;
};

export default WeekDaysDropdown;
