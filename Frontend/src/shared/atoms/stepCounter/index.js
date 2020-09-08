import React from 'react';

import styles from './style.module.scss';

const StepCounter = ({ number, total, title }) => {
  return (
    <div className={styles.stepCounter}>
      Step
      <span className={styles.count}>
        {number}/{total}
      </span>
      <span className={styles.text}>{title}</span>
    </div>
  );
};

export default StepCounter;
