import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './index';

const LanguageSwitcherContainer = () => {
  const languages = ['en', 'ar', 'ur'];
  const [t, i18n] = useTranslation();

  const updateLanguage = code => {
    localStorage.setItem('language', code);
    i18n.changeLanguage(code);
  };

  return <LanguageSwitcher t={t} handleChange={updateLanguage} currentLanguage={i18n.language} locales={languages} />;
};

export default LanguageSwitcherContainer;
