import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from 'store';
import Navigation from 'screens/Navigation';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
};

export default App;
