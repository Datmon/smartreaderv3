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
} from 'react-native';
import CustomText from 'components/CustomText';

const SignIn = ({ navigation }: any) => {
  const { SignInMeeting, SignInLabel } = useTranslation();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
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
        {/* <CustomInput /> */}
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
