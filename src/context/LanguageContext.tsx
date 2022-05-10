import React, { useContext, useEffect, useState } from 'react';
import en from '../lang/en.json';
import ue from '../lang/ue.json';
import de from '../lang/de.json';
import fr from '../lang/fr.json';
import * as RNLocalize from 'react-native-localize';
import App from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { actions, persistor, selectors, store } from 'store';

type LaguageContextType = {
  [key: string]: any;
};

const LanguageContext = React.createContext<LaguageContextType>(
  {} as LaguageContextType,
);

const languageObj = {
  en: en,
  ue: ue,
  de: de,
  fr: fr,
};

export const LanguageContextProvider: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider />
      </PersistGate>
    </StoreProvider>
  );
};

const LanguageProvider = () => {
  const selectedLanguage = useSelector(selectors.settings.selectLanguage);
  // const [selectedLanguage, setSelectedLanguage] = useState('en');

  const dispatch = useDispatch();

  const setSelectedLanguage = (lang: string) => {
    dispatch(actions.settings.changeLanguage(lang));
  };

  useEffect(() => {
    const currentLanguage = RNLocalize.findBestAvailableLanguage(
      Object.keys(languageObj),
    );
    setSelectedLanguage(currentLanguage?.languageTag || 'en');
  }, []);

  const value = {
    ...languageObj[selectedLanguage as 'en' | 'ru'],
  };

  console.log('value', value);

  return (
    <LanguageContext.Provider value={value}>
      <App />
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
