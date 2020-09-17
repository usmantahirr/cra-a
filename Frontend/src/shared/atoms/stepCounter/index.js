import React from 'react';

import styles from './style.module.scss';

const StepCounter = ({ number, title }) => {
  return (
    <div className={`${styles.stepCounter} stepCounter`}>
      Step
      <span className={`${styles.count} count`}>{number}</span>
      <span className={`${styles.text} text`}>{title}</span>
    </div>
  );
};

export default StepCounter;
