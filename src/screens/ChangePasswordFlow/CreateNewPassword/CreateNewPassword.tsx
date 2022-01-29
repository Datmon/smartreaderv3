import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useState } from 'react';
import BackButton from 'components/BackButton/BackButton';
import { Text } from 'components/Text';
import { useTranslation } from 'context/LanguageContext';
import Input from 'components/Input';
import { PasswordIcon, ShowPasswordIcon } from 'assets/svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from 'components/Button';

type RootStackParamList = {
  CreateNewPassword: undefined;
  SuccessChanged: undefined;
};

const CreateNewPassword = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'CreateNewPassword'>) => {
  const {
    CreateNewPasswordTitle,
    CreateNewPasswordLabel,
    CreateNewPasswordEnter,
    CreateNewPasswordConfirm,
    CreateNewPasswordResetPassword,
  } = useTranslation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
            <Text title text={CreateNewPasswordTitle} style={styles.title} />
            <Text label text={CreateNewPasswordLabel} style={styles.label} />
            <Input
              onChangeText={setNewPassword}
              value={newPassword}
              style={[styles.input, styles.firstInput]}
              placeholder={CreateNewPasswordEnter}
              autoComplete="password"
              textContentType="password"
              secureTextEntry={true}
              leftIcon={(color: string) => <PasswordIcon color={color} />}
              rightIcon={(color: string) => <ShowPasswordIcon color={color} />}
            />
            <Input
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              style={styles.input}
              placeholder={CreateNewPasswordConfirm}
              autoComplete="password-new"
              textContentType="newPassword"
              secureTextEntry={true}
              leftIcon={(color: string) => <PasswordIcon color={color} />}
              rightIcon={(color: string) => <ShowPasswordIcon color={color} />}
            />
          </View>
          <Button
            title={CreateNewPasswordResetPassword}
            onPress={() => navigation.navigate('SuccessChanged')}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateNewPassword;

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
  firstInput: {
    marginBottom: 16,
  },
});
