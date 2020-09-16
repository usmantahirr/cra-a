import React from 'react';

import styles from './style.module.scss';

const NextStep = ({ nextStepTitle }) => (
  <div className={`${styles.nextStep} nextStep`}>
    <div className={`${styles.title} title`}>Next Step</div>
    <div className={`${styles.text} text`}>{nextStepTitle}</div>
  </div>
);

export default NextStep;
