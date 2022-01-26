import React, { useState } from 'react';
import { useTranslation } from 'context/LanguageContext';
import { View, SafeAreaView, StyleSheet } from 'react-native';
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

const Auth = ({ navigation }: any) => {
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
    }
  };

  const changeisVisibleSignIn = () => {
    setisVisibleSignIn(!isVisibleSignIn);
    setPassword('');
    setUsername('');
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
            navigation.navigate('ResetPassword');
          }}
        />

        {isVisibleSignIn ? (
          <Button style={styles.button} title={SignInButton} onPress={signIn} />
        ) : (
          <Button style={styles.button} title={SignUpButton} onPress={signUp} />
        )}

        <Text text={SignUpOrLogin} style={styles.buttomLabelTextLogin} />

        <AppleButton style={styles.appleButton} />
        <GoogleButton />

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
