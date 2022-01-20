/**
 * @format
 */

import { LanguageContextProvider } from 'context/LanguageContext';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => LanguageContextProvider);
