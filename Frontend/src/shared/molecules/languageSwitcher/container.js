import React, { useContext } from 'react';
import LanguageContext from '../../modules/language/context';
import LanguageSwitcher from './index';

const languageSwitcherContainer = () => {
  const languages = ['en', 'ar', 'ur'];
  const langContext = useContext(LanguageContext);

  return (
    <LanguageSwitcher
      handleChange={langContext.switchLanguage}
      currentLanguage={langContext.currentLanguage}
      locales={languages}
    />
  );
};

export default languageSwitcherContainer;
