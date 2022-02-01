import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'context/LanguageContext';
import { View, SafeAreaView, StyleSheet, Alert, Platform } from 'react-native';
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
import { Field, Form } from 'react-final-form';
import {
  composeValidators,
  isEmail,
  minLength,
  required,
} from 'utils/validation';
import { RootStackParamList } from 'types';
import LoadingIndicator from 'components/LoadingIndicator';

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

  const [isVisibleSignIn, setisVisibleSignIn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (data: { email: string; password: string }) => {
    console.log('data: ', data);
    setIsLoading(true);
    if (data.email && data.password) {
      const res: any = await dispatch(
        actions.auth.signIn({ email: data.email, password: data.password }),
      );
      if (res.payload.message) {
        Alert.alert('Error', res.payload.message, [{ text: 'Ok' }]);
      }
    }
    setIsLoading(false);
  };

  const signUp = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    console.log('data: ', data);
    setIsLoading(true);
    if (data.email && data.password && data.username) {
      const res: any = await auth.signUp(
        data.username,
        data.email,
        data.password,
      );
      //console.log('res: ', res.response);
      if (res.response) {
        Alert.alert('Error', res.response.data.message, [{ text: 'Ok' }]);
      } else {
        navigation.navigate('Verification', {
          onVerification: () => signIn(data),
          email: data.email,
        });
      }
    }
    setIsLoading(false);
  };

  const changeisVisibleSignIn = () => {
    setisVisibleSignIn(!isVisibleSignIn);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <BackButton onPress={() => navigation.navigate('Onboarding')} />
          <View>
            {isVisibleSignIn ? (
              <>
                <Text title style={styles.SignInMeeting} text={SignInMeeting} />
                <Text label style={styles.SignInLabel} text={SignInLabel} />
              </>
            ) : (
              <Text title style={styles.SignInMeeting} text={SignUpMeeting} />
            )}

            {isVisibleSignIn ? (
              <Form
                onSubmit={signIn}
                render={({ handleSubmit }) => (
                  <>
                    <Field
                      name="email"
                      validate={composeValidators(required, isEmail)}>
                      {({ input, meta }) => (
                        <Input
                          meta={meta}
                          input={input}
                          style={styles.input}
                          placeholder="Email"
                          autoComplete="email"
                          textContentType="emailAddress"
                          secureTextEntry={false}
                          leftIcon={(color: string) => (
                            <EmailIcon color={color} />
                          )}
                        />
                      )}
                    </Field>
                    <Field
                      name="password"
                      validate={composeValidators(required, minLength(6))}>
                      {({ input, meta }) => (
                        <Input
                          meta={meta}
                          input={input}
                          style={styles.input}
                          secureTextEntry={true}
                          placeholder="Password"
                          autoComplete="password"
                          textContentType="password"
                          leftIcon={(color: string) => (
                            <PasswordIcon color={color} />
                          )}
                          rightIcon={(color: string) => (
                            <ShowPasswordIcon color={color} />
                          )}
                        />
                      )}
                    </Field>
                    <ClickableText
                      style={styles.forgotPass}
                      text={SignInForgotPass}
                      onPress={() => {
                        navigation.navigate('ResetPassword');
                      }}
                    />

                    <Button
                      style={styles.button}
                      title={SignInButton}
                      onPress={handleSubmit}
                    />
                  </>
                )}
              />
            ) : (
              <Form
                onSubmit={signUp}
                render={({ handleSubmit }) => (
                  <>
                    <Field
                      name="username"
                      validate={composeValidators(required, minLength(6))}>
                      {({ input, meta }) => (
                        <Input
                          meta={meta}
                          input={input}
                          style={styles.input}
                          placeholder="Username"
                          autoComplete="username"
                          textContentType="username"
                          leftIcon={(color: string) => (
                            <NicknameIcon color={color} />
                          )}
                        />
                      )}
                    </Field>
                    <Field
                      name="email"
                      validate={composeValidators(required, isEmail)}>
                      {({ input, meta }) => (
                        <Input
                          meta={meta}
                          input={input}
                          style={styles.input}
                          placeholder="Email"
                          autoComplete="email"
                          textContentType="emailAddress"
                          secureTextEntry={false}
                          leftIcon={(color: string) => (
                            <EmailIcon color={color} />
                          )}
                        />
                      )}
                    </Field>
                    <Field
                      name="password"
                      validate={composeValidators(required, minLength(6))}>
                      {({ input, meta }) => (
                        <Input
                          meta={meta}
                          input={input}
                          style={styles.input}
                          secureTextEntry={true}
                          placeholder="Password"
                          autoComplete="password"
                          textContentType="password"
                          leftIcon={(color: string) => (
                            <PasswordIcon color={color} />
                          )}
                          rightIcon={(color: string) => (
                            <ShowPasswordIcon color={color} />
                          )}
                        />
                      )}
                    </Field>
                    <ClickableText
                      style={styles.forgotPass}
                      text={SignInForgotPass}
                      onPress={() => {
                        navigation.navigate('ResetPassword');
                      }}
                    />
                    <Button
                      style={styles.button}
                      title={SignUpButton}
                      onPress={handleSubmit}
                    />
                  </>
                )}
              />
            )}

            <Text text={SignUpOrLogin} style={styles.buttomLabelTextLogin} />

            {Platform.OS === 'ios' && (
              <AppleButton
                style={styles.appleButton}
                setIsLoading={setIsLoading}
              />
            )}
            <GoogleButton setIsLoading={setIsLoading} />
          </View>
        </View>
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
      <LoadingIndicator isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    height: '100%',
    justifyContent: 'space-between',
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
