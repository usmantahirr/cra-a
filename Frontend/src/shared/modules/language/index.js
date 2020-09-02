import React, { useState, useEffect } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';

import LanguageContext from './context';
import en from './defaultLanguage';

addLocaleData([...en]);

const LanguageContainer = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [langResource, setLangResource] = useState({});
  let messages = en;

  useEffect(() => {
    if (language) {
      const languageResource = messages; // eslint-disable-line
      setLangResource(languageResource);
    }
  }, [language]);

  const switchLanguage = lang => {
    // API CALL  =>
    setTimeout(() => {
      messages = {
        title: 'colfa description',
        description: 'colfa description',
      };
      if (lang) {
        setLanguage(lang);
      }
    }, 200);
  };

  return (
    <IntlProvider locale="{language}" messages={langResource} defaultLocale="en">
      <LanguageContext.Provider value={{ language, switchLanguage }}>{children}</LanguageContext.Provider>
    </IntlProvider>
  );
};

export default LanguageContainer;
