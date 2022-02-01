import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import { selectors } from 'store';
import Onboarding from 'screens/Onboarding';
import Auth from 'screens/Auth';
import ResetPassword from 'screens/ChangePasswordFlow/ResetPassword';
import Verification from 'screens/ChangePasswordFlow/Verification';
import { StorageService } from 'services';
import Bookshelf from 'screens/Bookshelf';
import { actions } from 'store';
import CreateNewPassword from './ChangePasswordFlow/CreateNewPassword';
import SuccessChanged from './ChangePasswordFlow/SuccessChanged';
import { Text } from 'components/Text';
import LoadingIndicator from 'components/LoadingIndicator';

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectors.auth.selectAccessToken);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const getToken = async () => {
    const token = await StorageService.getAssessToken();
    if (token) {
      dispatch(actions.auth.setAccessToken(token));
    }
    console.log('getToken: ', token);
  };
  console.log('accessToken: ', accessToken);

  const getOnboarding = async () => {
    const OnboardingState = await StorageService.getOnboarding();
    setShowOnboarding(OnboardingState === 'false' ? false : true);
    setIsLoading(false);
  };

  useEffect(() => {
    SplashScreen.hide();
    getToken();
    getOnboarding();
  }, []);

  if (isLoading) {
    return <LoadingIndicator isLoading={isLoading} />;
  }

  return (
    <NavigationContainer>
      {!accessToken ? (
        <AuthStack.Navigator
          initialRouteName={showOnboarding ? 'Onboarding' : 'Onboarding'} // : 'Onboarding' => 'Auth'
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#FFFFFF',
            },
          }}>
          <AuthStack.Screen name="Onboarding" component={Onboarding} />
          <AuthStack.Screen name="Auth" component={Auth} />
          <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
          <AuthStack.Screen name="Verification" component={Verification} />
          <AuthStack.Screen
            name="CreateNewPassword"
            component={CreateNewPassword}
          />
          <AuthStack.Screen name="SuccessChanged" component={SuccessChanged} />
        </AuthStack.Navigator>
      ) : (
        <MainStack.Navigator
          initialRouteName="Bookshelf"
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#FFFFFF',
            },
          }}>
          <MainStack.Screen name="Bookshelf" component={Bookshelf} />
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
