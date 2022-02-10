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

import LoadingIndicator from 'components/LoadingIndicator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Organaizer from './Organaizer';
import Meeting from './Meeting';
import Profile from './Profile';
import {
  BookshelfIcon,
  MeetingIcon,
  OrganaizerIcon,
  ProfileIcon,
} from 'assets/svg';
import { Host } from 'react-native-portalize';

const AuthStack = createNativeStackNavigator();
const MainTabs = createBottomTabNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectors.auth.selectAccessToken);
  const [beenAuthorized, setBeenAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getToken = async () => {
    const token = await StorageService.getAssessToken();
    if (token) {
      dispatch(actions.auth.setAccessToken(token));
    }
    console.log('getToken: ', token);
  };

  const getOnboarding = async () => {
    const beenAuthorizedState = await StorageService.getBeenAuthorized();
    setBeenAuthorized(beenAuthorizedState === 'true' ? true : false);
    setIsLoading(false);
  };

  const deleteStateOnboarding = async () => {
    await StorageService.removeBeenAuthorized();
  };

  useEffect(() => {
    setIsLoading(true);
    getOnboarding();
  }, [accessToken]);

  useEffect(() => {
    deleteStateOnboarding();
    SplashScreen.hide();
    getToken();
  }, []);

  if (isLoading) {
    return <LoadingIndicator isLoading={isLoading} />;
  }

  console.log('beenAuthorized: ', beenAuthorized);
  return (
    <NavigationContainer>
      {!accessToken ? (
        <AuthStack.Navigator
          initialRouteName={beenAuthorized ? 'Auth' : 'Onboarding'}
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
        <Host>
          <MainTabs.Navigator
            initialRouteName="Bookshelf"
            screenOptions={{
              headerShown: false,
              // contentStyle: {
              //   backgroundColor: '#FFFFFF',
              // },
            }}>
            <MainTabs.Screen
              name="Bookshelf"
              component={Bookshelf}
              options={{
                tabBarIcon: ({ focused }) => (
                  <BookshelfIcon focused={focused} />
                ),
              }}
            />

            <MainTabs.Screen
              name="Organaizer"
              component={Organaizer}
              options={{
                tabBarIcon: ({ focused }) => (
                  <OrganaizerIcon focused={focused} />
                ),
              }}
            />
            <MainTabs.Screen
              name="Meeting"
              component={Meeting}
              options={{
                tabBarIcon: ({ focused }) => <MeetingIcon focused={focused} />,
              }}
            />
            <MainTabs.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
              }}
            />
          </MainTabs.Navigator>
        </Host>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
