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
import {
  composeValidators,
  isSame,
  minLength,
  required,
} from 'utils/validation';
import { Field, Form } from 'react-final-form';

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

  const onSubmit = () => {
    navigation.navigate('SuccessChanged');
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <View style={styles.container}>
              <View>
                <BackButton onPress={() => navigation.goBack()} />
                <Text
                  title
                  text={CreateNewPasswordTitle}
                  style={styles.title}
                />
                <Text
                  label
                  text={CreateNewPasswordLabel}
                  style={styles.label}
                />
                <Field
                  name="New password"
                  validate={composeValidators(required, minLength(6))}>
                  {({ input, meta }) => (
                    <Input
                      meta={meta}
                      input={input}
                      onChangeText={setNewPassword}
                      value={newPassword}
                      style={[styles.input, styles.firstInput]}
                      placeholder={CreateNewPasswordEnter}
                      autoComplete="password"
                      textContentType="password"
                      secureTextEntry={true}
                      leftIcon={(color: string) => (
                        <PasswordIcon color={color} />
                      )}
                      rightIcon={(color: string) => (
                        <ShowPasswordIcon color={color} />
                      )}
                    />
                  )}
                </Field>
                <Field
                  name="Confirm password"
                  validate={composeValidators(
                    required,
                    minLength(6),
                    isSame(newPassword),
                  )}>
                  {({ input, meta }) => (
                    <Input
                      meta={meta}
                      input={input}
                      onChangeText={setConfirmPassword}
                      value={confirmPassword}
                      style={styles.input}
                      placeholder={CreateNewPasswordConfirm}
                      autoComplete="password-new"
                      textContentType="newPassword"
                      secureTextEntry={true}
                      leftIcon={(color: string) => (
                        <PasswordIcon color={color} />
                      )}
                      rightIcon={(color: string) => (
                        <ShowPasswordIcon color={color} />
                      )}
                    />
                  )}
                </Field>
              </View>
              <Button
                title={CreateNewPasswordResetPassword}
                onPress={handleSubmit}
              />
            </View>
          )}
        />
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
