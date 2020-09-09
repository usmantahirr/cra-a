import React from 'react';

import styles from './style.module.scss';

const NextStep = ({ nextStepTitle }) => (
  <div className={styles.nextStep}>
    <span className={styles.title}>Next Step</span>
    <span className={styles.text}>{nextStepTitle}</span>
  </div>
);

export default NextStep;
