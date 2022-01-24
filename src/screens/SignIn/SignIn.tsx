import React, { useState } from 'react';
import { useTranslation } from 'context/LanguageContext';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
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

const SignIn = ({ navigation }: any) => {
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
  const [visibleSignIn, setVisibleSignIn] = useState<boolean>(true);

  const signIn = async () => {
    if (email && password) {
      const res = await dispatch(actions.auth.signIn({ email, password }));
      console.log(res);
    }
  };

  const signUp = async () => {
    if (email && password && username) {
      const res = await auth.signUp(username, email, password);
      console.log(res);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding')}
          activeOpacity={0.6}
          style={styles.backButton}>
          <Image
            source={require('../../assets/images/left_arrow.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text
          style={styles.SignInMeeting}
          text={SignInMeeting}
          visible={visibleSignIn}
        />
        <Text
          style={styles.SignInLabel}
          text={SignInLabel}
          visible={visibleSignIn}
        />
        <Text
          style={styles.SignInMeeting}
          text={SignUpMeeting}
          visible={!visibleSignIn}
        />
        <Input
          onChangeText={setUsername}
          value={username}
          style={styles.input}
          placeholder="Username"
          leftIcon={<NicknameIcon />}
          visible={!visibleSignIn}
        />
        <Input
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          placeholder="Email"
          secureTextEntry={false}
          leftIcon={<EmailIcon />}
        />
        <Input
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          leftIcon={<PasswordIcon />}
          rightIcon={<ShowPasswordIcon />}
        />
        <ClickableText
          style={styles.forgotPass}
          text={SignInForgotPass}
          onPress={() => {}}
        />

        <Button
          style={styles.button}
          title={SignInButton}
          onPress={signIn}
          visible={visibleSignIn}
        />
        <Button
          style={styles.button}
          title={SignUpButton}
          onPress={signUp}
          visible={!visibleSignIn}
        />

        <Text text={SignUpOrLogin} style={styles.buttomLabelTextLogin} />

        <AppleButton />
        <GoogleButton />

        <View style={styles.buttomLabel}>
          <Text
            text={(visibleSignIn ? SignUpQuestionIn : SignUpQuestionUp) + ' '}
            style={styles.buttomLabelText}
          />

          <ClickableText
            onPress={() => setVisibleSignIn(!visibleSignIn)}
            text={visibleSignIn ? 'Sign Up' : 'Sign In'}
            style={''}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  image: {
    height: 12,
    width: 7,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignInMeeting: {
    fontSize: 28,
    fontWeight: '500',
    color: '#1A202C',
  },
  SignInLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#718096',
  },
  input: {
    height: 56,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    borderRadius: 16,
    fontWeight: '500',
  },
  forgotPass: {
    alignSelf: 'flex-end',
  },
  button: {
    marginVertical: 24,
  },
  buttomLabel: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttomLabelText: {
    color: '#4A5568',
    fontSize: 14,
    height: '100%',
  },
  buttomLabelTextLogin: {
    color: '#4A5568',
    fontSize: 14,
    alignSelf: 'center',
  },
});
