import React from 'react';

const LanguageSwitcher = ({ handleChange, currentLanguage, locales, t }) => (
  <div>
    <span>{t('selectLanguage')}</span>
    <select
      value={currentLanguage}
      onChange={
        event => handleChange(event.target.value) // eslint-disable-line
      }
    >
      {locales.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

export default LanguageSwitcher;
