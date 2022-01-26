import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from 'store';
import Onboarding from 'screens/Onboarding';
import Auth from 'screens/Auth';
import ResetPassword from 'screens/ResetPassword';
import Verification from 'screens/Verification';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#FFFFFF',
            },
          }}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="Verification" component={Verification} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
