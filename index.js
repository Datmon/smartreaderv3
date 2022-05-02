/**
 * @format
 */

import 'react-native-gesture-handler';

import { LanguageContextProvider } from 'context/LanguageContext';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () =>
  gestureHandlerRootHOC(LanguageContextProvider),
);
