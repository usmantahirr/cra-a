import React from 'react';

const LanguageContext = React.createContext({
  currentLanguage: 'en',
  messages: {},
  switchLanguage: () => {},
});

export default LanguageContext;
