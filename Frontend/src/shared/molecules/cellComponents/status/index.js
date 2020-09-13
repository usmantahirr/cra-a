import React from 'react';
import Badge from '../../../atoms/Badge/index';
import BadgeColor from '../../../atoms/Badge/badgeColor';

const colorPicker = {
  NEGATIVE: BadgeColor.red,
  REPEAT_SAMPLE: BadgeColor.yellow,
  POSITIVE: BadgeColor.green,
  BORDER_LINE: BadgeColor.yellow,
  IN_CONCLUSIVE: BadgeColor.yellow,
};

const Status = props => {
  const { data = null } = props;
  const code = data && data.test_result.toUpperCase().replace(' ', '_');
  const color = data && colorPicker[code];
  return data ? <Badge color={color} text={data.testResult} /> : null;
};

export default Status;
