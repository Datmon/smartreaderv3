import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'context/LanguageContext';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Text } from 'components/Text';
import Input from 'components/Input';
import { auth } from 'api';
import { actions } from 'store';
import { useDispatch } from 'react-redux';
import {
  EmailIcon,
  ShowPasswordIcon,
  PasswordIcon,
  NicknameIcon,
} from 'assets/svg';
import ClickableText from 'components/ClickableText';
import Button from 'components/Button';
import AppleButton from 'components/AppleButton';
import GoogleButton from 'components/GoogleButton';
import BackButton from 'components/BackButton/BackButton';

type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  ResetPassword: { email: string } | undefined;
};

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '835684202283-odefn9hn26qhmvj2jk0cb6p357epnm6m.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId:
    '835684202283-klfmeg9ebibfv2js15ljdc9sclf8efvn.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

const Auth = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Auth'>) => {
  const {
    SignInMeeting,
    SignInLabel,
    SignInForgotPass,
    SignUpMeeting,
    SignInButton,
    SignUpButton,
    SignUpOrLogin,
    SignUpQuestionIn,
    SignUpQuestionUp,
  } = useTranslation();

  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [isVisibleSignIn, setisVisibleSignIn] = useState<boolean>(true);

  const signIn = async () => {
    if (email && password) {
      const res = await dispatch(actions.auth.signIn({ email, password }));
    }
  };

  const signUp = async () => {
    if (email && password && username) {
      const res = await auth.signUp(username, email, password);
      console.log(res);
      signIn();
    }
  };

  const changeisVisibleSignIn = () => {
    setisVisibleSignIn(!isVisibleSignIn);
    setPassword('');
    setUsername('');
  };

  const signInGoogle = async () => {
    //TODO: setup android: https://github.com/react-native-google-signin/google-signin/blob/master/docs/android-guide.md
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo: ', userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <BackButton onPress={() => navigation.navigate('Onboarding')} />
        {isVisibleSignIn ? (
          <>
            <Text title style={styles.SignInMeeting} text={SignInMeeting} />
            <Text label style={styles.SignInLabel} text={SignInLabel} />
          </>
        ) : (
          <Text title style={styles.SignInMeeting} text={SignUpMeeting} />
        )}

        {!isVisibleSignIn && (
          <Input
            onChangeText={setUsername}
            value={username}
            style={styles.input}
            placeholder="Username"
            leftIcon={(color: string) => <NicknameIcon color={color} />}
          />
        )}

        <Input
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          placeholder="Email"
          secureTextEntry={false}
          leftIcon={(color: string) => <EmailIcon color={color} />}
        />
        <Input
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          leftIcon={(color: string) => <PasswordIcon color={color} />}
          rightIcon={(color: string) => <ShowPasswordIcon color={color} />}
        />
        <ClickableText
          style={styles.forgotPass}
          text={SignInForgotPass}
          onPress={() => {
            navigation.navigate('ResetPassword', { email });
          }}
        />

        {isVisibleSignIn ? (
          <Button style={styles.button} title={SignInButton} onPress={signIn} />
        ) : (
          <Button style={styles.button} title={SignUpButton} onPress={signUp} />
        )}

        <Text text={SignUpOrLogin} style={styles.buttomLabelTextLogin} />

        <AppleButton style={styles.appleButton} />
        <GoogleButton onPress={signInGoogle} />

        <View style={styles.buttomLabel}>
          <Text
            text={(isVisibleSignIn ? SignUpQuestionIn : SignUpQuestionUp) + ' '}
            style={styles.buttomLabelText}
          />

          <ClickableText
            onPress={() => changeisVisibleSignIn()}
            text={isVisibleSignIn ? 'Sign Up' : 'Sign In'}
            style={''}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  SignInMeeting: {
    marginBottom: 8,
  },
  SignInLabel: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
  forgotPass: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  button: {
    marginTop: 24,
  },
  buttomLabel: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: 'auto',
    maxHeight: '10%',
  },
  buttomLabelText: {
    color: '#4A5568',
    fontSize: 14,
  },
  buttomLabelTextLogin: {
    color: '#4A5568',
    fontSize: 14,
    alignSelf: 'center',
    marginVertical: 24,
  },
  appleButton: {
    marginBottom: 12,
  },
});
