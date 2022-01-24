import React, { useState } from 'react';
import { useTranslation } from 'context/LanguageContext';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  Text,
} from 'react-native';
import CustomText from 'components/CustomText';
import CustomInput from 'components/CustomInput/CustomInput';
import { auth } from 'api';
import { actions } from 'store';
import { useDispatch } from 'react-redux';

const Auth = ({ navigation }: any) => {
  const { SignInMeeting, SignInLabel } = useTranslation();

  const dispatch = useDispatch();

  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

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

  const changeSignInStatus = (nextStatus: boolean) => {
    setIsSignIn(nextStatus);
    setEmail('');
    setPassword('');
    setUsername('');
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
        <CustomText customStyles={styles.SignInMeeting} text={SignInMeeting} />
        <CustomText customStyles={styles.SignInLabel} text={SignInLabel} />
        {isSignIn ? (
          <>
            <CustomInput
              onChangeText={setEmail}
              value={email}
              style={styles.input}
              placeholder="Email"
              secureTextEntry={false}
            />
            <CustomInput
              onChangeText={setPassword}
              value={password}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
            />

            <Button title="Sign in" onPress={signIn} />
          </>
        ) : (
          <>
            <CustomInput
              onChangeText={setUsername}
              value={username}
              style={styles.input}
              placeholder="Username"
            />
            <CustomInput
              onChangeText={setEmail}
              value={email}
              style={styles.input}
              placeholder="Email"
              secureTextEntry={false}
            />
            <CustomInput
              onChangeText={setPassword}
              value={password}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
            />

            <Button title="Sign up" onPress={signUp} />
          </>
        )}

        <Text>
          Don't have an account?{' '}
          <TouchableOpacity onPress={() => changeSignInStatus(!isSignIn)}>
            <Text>{isSignIn ? 'Sign Up' : 'Sign In'}</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Auth;

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
    margin: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    borderRadius: 16,
    fontWeight: '500',
  },
});
