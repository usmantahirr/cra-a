import React from 'react';
import Logger from '../modules/logger';

const defaultSidebarContext = {
  isCollapsed: false,
  setIsCollapsed: value => {
    Logger.info(value);
  },
};

export const SidebarContext = React.createContext(defaultSidebarContext);
export const SidebarContextProvider = SidebarContext.Provider;
export const SidebarContextConsumer = SidebarContext.Consumer;
