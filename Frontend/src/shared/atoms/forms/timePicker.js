import React from 'react';
import { TimePicker } from 'antd';

function CustomTimePicker({ ...props }) {
  return <TimePicker {...props} use12Hours format="h:mm a" />;
}

export default CustomTimePicker;
