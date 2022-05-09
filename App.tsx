import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from 'store';
import Navigation from 'screens/Navigation';

const App = () => {
  return <Navigation />;
};

export default App;
