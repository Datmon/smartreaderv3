import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'context/LanguageContext';
import { View, SafeAreaView, StyleSheet, Alert, Platform } from 'react-native';
import { Text } from 'components/Text';
import Input from 'components/Input';
import { auth } from 'api';
import { actions } from 'store';
import { useDispatch } from 'react-redux';
import { EmailIcon, PasswordIcon, NicknameIcon } from 'assets/svg';
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
  const [key, setKey] = useState(0);

  const { PlaceholderContext } = useTranslation();
  const { EmailPlaceholder, PasswordPlaceholder, UsernamePlaceholder } =
    PlaceholderContext;

  const handleVerifyUser = async (email: string, id: string) => {
    await auth.verifyUser(email, id);
  };

  const signIn = async (data: { email: string; password: string }) => {
    console.log('data: ', data);
    setIsLoading(true);
    if (data.email && data.password) {
      const res: any = await dispatch(
        actions.auth.signIn({ email: data.email, password: data.password }),
      );
      if (res.payload.message) {
        if (res.payload.message === 'Email is not verified') {
          Alert.alert('Error', res.payload.message, [
            {
              text: 'Ok',
              onPress: () =>
                navigation.navigate('Verification', {
                  onVerification: async () => {
                    const user = await auth.userExists(data.email);
                    await handleVerifyUser(data.email, user.data.id);
                    await signIn(data);
                  },
                  email: data.email,
                }),
            },
          ]);
        } else {
          Alert.alert('Error', res.payload.message, [{ text: 'Ok' }]);
        }
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
          onVerification: async () => {
            await handleVerifyUser(res.data.email, res.data.id);
            await signIn(data);
          },
          email: data.email,
        });
      }
    }
    setIsLoading(false);
  };

  const changeisVisibleSignIn = () => {
    setisVisibleSignIn(!isVisibleSignIn);
    setKey(key + 2);
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View>
            <BackButton onPress={() => navigation.navigate('Onboarding')} />
            <View>
              {isVisibleSignIn ? (
                <>
                  <Text
                    title
                    style={styles.SignInMeeting}
                    text={SignInMeeting}
                  />
                  <Text label style={styles.SignInLabel} text={SignInLabel} />
                </>
              ) : (
                <Text title style={styles.SignInMeeting} text={SignUpMeeting} />
              )}

              {isVisibleSignIn ? (
                <Form
                  onSubmit={signIn}
                  key={key}
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
                            placeholder={EmailPlaceholder}
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
                            placeholder={PasswordPlaceholder}
                            autoComplete="password"
                            textContentType="password"
                            leftIcon={(color: string) => (
                              <PasswordIcon color={color} />
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
                  key={key + 1}
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
                            placeholder={UsernamePlaceholder}
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
                            placeholder={EmailPlaceholder}
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
                            placeholder={PasswordPlaceholder}
                            autoComplete="password"
                            textContentType="password"
                            leftIcon={(color: string) => (
                              <PasswordIcon color={color} />
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

              <View style={styles.labelButtons}>
                <View style={styles.line} />
                <View>
                  <Text
                    text={SignUpOrLogin}
                    style={styles.buttomLabelTextLogin}
                  />
                </View>
                <View style={styles.line} />
              </View>

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
              text={
                (isVisibleSignIn ? SignUpQuestionIn : SignUpQuestionUp) + ' '
              }
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
      <LoadingIndicator isLoading={isLoading} />
    </>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 10,
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
  labelButtons: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginHorizontal: 20,
  },
  appleButton: {
    marginBottom: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
});
