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
import Bookshelf from 'screens/Bookshelf';
import { actions } from 'store';
import CreateNewPassword from './ChangePasswordFlow/CreateNewPassword';
import SuccessChanged from './ChangePasswordFlow/SuccessChanged';

import LoadingIndicator from 'components/LoadingIndicator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Organaizer from './Organaizer';
import Meeting from './Meeting';
import {
  BookshelfIcon,
  MeetingIcon,
  OrganaizerIcon,
  ProfileIcon,
} from 'assets/svg';
import { Host } from 'react-native-portalize';
import axios from 'axios';
import ReadingSpace from './ReadingSpace';
import Profile from './ProfileScreens/Profile';
import ProfileSettings from './ProfileScreens/ProfileSettings';
import Language from './ProfileScreens/Language';
import ChangePassword from './ProfileScreens/ChangePassword';
import Notifications from './ProfileScreens/Notifications';

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const MainTabs = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectors.auth.selectAccessToken);

  // const getToken = async () => {
  //   const token = await StorageService.getAssessToken();
  //   if (token) {
  //     await setBearer(token);
  //     dispatch(actions.auth.setAccessToken(token));
  //   }
  //   console.log('getToken: ', token);
  // };

  const setBearer = async (token: string) => {
    if (token) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + token;
      dispatch(actions.books.getBooks());
    } else {
      axios.defaults.headers.common.Authorization = false;
      /*if setting null does not remove `Authorization` header then try
          delete axios.defaults.headers.common['Authorization'];
        */
    }
  };

  useEffect(() => {
    setBearer(accessToken);
  }, [accessToken]);

  useEffect(() => {
    SplashScreen.hide();
    // getToken();
  }, []);

  const ProfileTabNavigator = () => (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{
          title: 'Profile',
          headerStyle: { backgroundColor: '#F7F8F9' },
          // headerBackImageSource: require('assets/images/backArrow.png'),
          headerBackTitleVisible: false,
        }}
      />
      <ProfileStack.Screen
        name="Language"
        component={Language}
        options={{
          title: 'Language',
          headerStyle: { backgroundColor: '#F7F8F9' },
          // headerBackImageSource: require('assets/images/backArrow.png'),
          headerBackTitleVisible: false,
        }}
      />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: 'Change password',
          headerStyle: { backgroundColor: '#F7F8F9' },
          // headerBackImageSource: require('assets/images/backArrow.png'),
          headerBackTitleVisible: false,
        }}
      />
      <ProfileStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notifications',
          headerStyle: { backgroundColor: '#F7F8F9' },
          // headerBackImageSource: require('assets/images/backArrow.png'),
          headerBackTitleVisible: false,
        }}
      />
    </ProfileStack.Navigator>
  );

  const Tabs = () => (
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
          tabBarIcon: ({ focused }) => <BookshelfIcon focused={focused} />,
        }}
      />

      <MainTabs.Screen
        name="Organaizer"
        component={Organaizer}
        options={{
          tabBarIcon: ({ focused }) => <OrganaizerIcon focused={focused} />,
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
        component={ProfileTabNavigator}
        options={{
          tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
        }}
      />
    </MainTabs.Navigator>
  );

  return (
    <NavigationContainer>
      {!accessToken ? (
        <AuthStack.Navigator
          initialRouteName={'Onboarding'}
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
          <MainStack.Navigator
            initialRouteName="Tabs"
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: '#FFFFFF',
              },
            }}>
            <MainStack.Screen name="Tabs" component={Tabs} />
            <MainStack.Screen name="ReadingSpace" component={ReadingSpace} />
          </MainStack.Navigator>
        </Host>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
