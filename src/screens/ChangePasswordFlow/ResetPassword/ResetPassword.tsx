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
import { Form, Field } from 'react-final-form';
import { composeValidators, isEmail, required } from 'utils/validation';

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

  const onSubmit = () => {
    navigation.navigate('Verification');
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Form
          onSubmit={onSubmit}
          initialValues={{ email: email }}
          render={({ handleSubmit }) => (
            <View style={styles.container}>
              <View>
                <BackButton onPress={() => navigation.goBack()} />
                <Text title text={ResetTitle} style={styles.title} />
                <Text label text={ResetLabel} style={styles.label} />

                <Field
                  name="email"
                  validate={composeValidators(required, isEmail)}>
                  {({ input, meta }) => (
                    <Input
                      meta={meta}
                      input={input}
                      onChangeText={setEmail}
                      value={email}
                      style={styles.input}
                      placeholder="Email"
                      autoComplete="email"
                      textContentType="emailAddress"
                      secureTextEntry={false}
                      leftIcon={(color: string) => <EmailIcon color={color} />}
                    />
                  )}
                </Field>
              </View>

              <Button
                style={styles.button}
                title={ResetButton}
                onPress={handleSubmit}
              />
            </View>
          )}
        />
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
