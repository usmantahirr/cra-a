import React from 'react';
import Logger from '../../../shared/modules/logger';

const defaultApplicationContext = {
  heading: false,
  setHeading: value => {
    Logger.info(value);
  },
};

export const ApplicationContext = React.createContext(defaultApplicationContext);
export const ApplicationContextProvider = ApplicationContext.Provider;
export const ApplicationContextConsumer = ApplicationContext.Consumer;
export default ApplicationContext;
