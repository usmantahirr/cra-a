import React from 'react';

import styles from './style.module.scss';

const NextStep = ({ nextStepTitle }) => (
  <div className={styles.nextStep}>
    <div className={styles.title}>Next Step</div>
    <div className={styles.text}>{nextStepTitle}</div>
  </div>
);

export default NextStep;
