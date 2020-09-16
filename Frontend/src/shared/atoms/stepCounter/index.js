import React from 'react';

// import styles from './style.module.scss';

const StepCounter = ({ number, title }) => {
  return (
    <div className="stepCounter">
      Step
      <span className="count">{number}</span>
      <span className="text">{title}</span>
    </div>
  );
};

export default StepCounter;
