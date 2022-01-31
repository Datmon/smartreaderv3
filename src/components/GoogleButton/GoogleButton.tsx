import { Image, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { useTranslation } from 'context/LanguageContext';
import { Text } from 'components/Text';
import { useDispatch } from 'react-redux';
import { actions } from 'store';

const GoogleButton = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.signOut();
  }, []);

  if (Platform.OS === 'android') {
    GoogleSignin.configure({
      scopes: ['profile'],
      webClientId:
        '835684202283-jp3078rli0lrrk81ip19oeotcl5lqcso.apps.googleusercontent.com',
    });
  } else {
    GoogleSignin.configure({
      scopes: ['profile'],
      iosClientId:
        '835684202283-klfmeg9ebibfv2js15ljdc9sclf8efvn.apps.googleusercontent.com',
    });
  }

  const signInGoogle = async () => {
    //TODO: setup android: https://github.com/react-native-google-signin/google-signin/blob/master/docs/android-guide.md
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo: ', userInfo);
      if (userInfo.user.familyName) {
        const res = await dispatch(
          actions.auth.serviceSignUp({
            email: userInfo.user.email,
            username: userInfo.user.familyName,
          }),
        );
      }
    } catch (error) {
      console.log('catch: ', error);
    }
  };

  const { GoogleButtonLabel } = useTranslation();
  return (
    <TouchableOpacity style={styles.button} onPress={() => signInGoogle()}>
      <Image
        source={require('../../assets/images/google.png')}
        style={styles.image}
      />
      <Text text={GoogleButtonLabel} />
    </TouchableOpacity>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    height: 56,
    flexDirection: 'row',
  },
  image: {
    height: 20,
    resizeMode: 'contain',
    marginBottom: 5,
    marginHorizontal: 4,
  },
});
