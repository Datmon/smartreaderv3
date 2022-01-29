import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BackButton from 'components/BackButton/BackButton';
import { Text } from 'components/Text';
import { useTranslation } from 'context/LanguageContext';
import Input from 'components/Input';
import { EmailIcon } from 'assets/svg';
import Button from 'components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  ResetPassword: { email: string } | undefined;
  Verification: undefined;
};

const ResetPassword = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'ResetPassword'>) => {
  const { ResetTitle, ResetLabel, ResetButton } = useTranslation();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const userEmail = route.params?.email || '';
    setEmail(userEmail);
  }, [route.params?.email]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
            <Text title text={ResetTitle} style={styles.title} />
            <Text label text={ResetLabel} style={styles.label} />
            <Input
              onChangeText={setEmail}
              value={email}
              style={styles.input}
              placeholder="Email"
              autoComplete="email"
              textContentType="emailAddress"
              secureTextEntry={false}
              leftIcon={(color: string) => <EmailIcon color={color} />}
            />
          </View>

          <Button
            style={styles.button}
            title={ResetButton}
            onPress={() => navigation.navigate('Verification')}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    height: '100%',
    justifyContent: 'space-between',
  },
  input: {},
  title: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 28,
  },
  button: {},
});
