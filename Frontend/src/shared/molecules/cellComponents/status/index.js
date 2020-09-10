import React from 'react';
import Badge from '../../../atoms/Badge/index';
import BadgeColor from '../../../atoms/Badge/badgeColor';

const Status = ({ value }) => {
  const color = value < 36000 ? BadgeColor.Pink : BadgeColor.yellow;
  const text = value;
  return <Badge color={color} text={text} />;
};

export default Status;
