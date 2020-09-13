import React from 'react';
import { DatePicker } from 'antd';
import * as moment from 'moment';

function CustomDatePicker({ disableDates, ...props }) {
  const disabledDate = current => {
    if (disableDates && disableDates === 'GreaterThanToday') return current && current > moment().startOf('day');
    if (disableDates && disableDates === 'LesserThanToday') return current && current < moment().startOf('day');
    return false;
  };

  return <DatePicker disabledDate={disabledDate} {...props} className="custom-control" />;
}

export default CustomDatePicker;
