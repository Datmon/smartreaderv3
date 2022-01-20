import React, { useContext, useEffect, useState } from 'react';
import en from '../lang/en.json';
import ru from '../lang/ru.json';
import * as RNLocalize from 'react-native-localize';
import App from '../../App';

type LaguageContextType = {
  [key: string]: string;
};

const LanguageContext = React.createContext<LaguageContextType>(
  {} as LaguageContextType,
);

const languageObj = {
  en: en,
  //ru: ru,
  ru: en,
};

export const LanguageContextProvider: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const currentLanguage = RNLocalize.findBestAvailableLanguage(
      Object.keys(languageObj),
    );
    setSelectedLanguage(currentLanguage?.languageTag || 'en');
  }, []);

  const value = {
    ...languageObj[selectedLanguage as 'en' | 'ru'],
  };
  return (
    <LanguageContext.Provider value={value}>
      <App />
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
