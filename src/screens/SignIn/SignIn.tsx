import React, { useState } from 'react';
import { useTranslation } from 'context/LanguageContext';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import CustomText from 'components/CustomText';
import CustomInput from 'components/CustomInput/CustomInput';
import { auth } from 'api';

const SignIn = ({ navigation }: any) => {
  const { SignInMeeting, SignInLabel } = useTranslation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const signIn = async () => {
    if (email && password) {
      const res = await auth.signIn(email, password);
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
        <CustomText customStyles={styles.SignInMeeting} text={SignInMeeting} />
        <CustomText customStyles={styles.SignInLabel} text={SignInLabel} />
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

        <Button title="Sign in" onPress={signIn} />
        <Button title="Sign up" onPress={signUp} />
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
    margin: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    borderRadius: 16,
    fontWeight: '500',
  },
});
