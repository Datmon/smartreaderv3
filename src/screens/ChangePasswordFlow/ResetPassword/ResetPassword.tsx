import {
  Alert,
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
import { EmailIcon } from 'assets/svg';
import Button from 'components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Form, Field } from 'react-final-form';
import { composeValidators, isEmail, required } from 'utils/validation';
import { RootStackParamList } from 'types';
import { useDispatch } from 'react-redux';
import { actions } from 'store';
import LoadingIndicator from 'components/LoadingIndicator';

const ResetPassword = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ResetPassword'>) => {
  const { ResetTitle, ResetLabel, ResetButton, PlaceholderContext } =
    useTranslation();
  const { EmailPlaceholder } = PlaceholderContext;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: { email: string }) => {
    setIsLoading(true);
    const res: any = await dispatch(
      actions.auth.userExists({ email: values.email }),
    );
    if (res.payload.message) {
      Alert.alert('Error', res.payload.message, [{ text: 'Ok' }]);
    } else {
      navigation.navigate('Verification', {
        onVerification: () => navigation.navigate('CreateNewPassword'),
        email: values.email,
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Form
            onSubmit={onSubmit}
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
      <LoadingIndicator isLoading={isLoading} />
    </>
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
