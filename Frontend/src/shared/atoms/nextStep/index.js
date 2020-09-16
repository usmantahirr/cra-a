import React from 'react';

// import styles from './style.module.scss';

const NextStep = ({ nextStepTitle }) => (
  <div className="nextStep">
    <div className="title">Next Step</div>
    <div className="text">{nextStepTitle}</div>
  </div>
);

export default NextStep;
