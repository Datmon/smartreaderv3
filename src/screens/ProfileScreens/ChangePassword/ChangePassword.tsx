import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Field, Form } from 'react-final-form';
import ClickableText from 'components/ClickableText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import {
  composeValidators,
  isSame,
  minLength,
  required,
} from 'utils/validation';
import Input from 'components/Input';
import { PasswordIcon } from 'assets/svg';
import Button from 'components/Button';

const ChangePassword = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ChangePassword'>) => {
  const onSubmit = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values }) => (
          <View style={styles.form}>
            <View style={styles.formFileds}>
              <Field
                name="current"
                validate={composeValidators(required, minLength(6))}>
                {({ input, meta }) => (
                  <Input
                    meta={meta}
                    input={input}
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Current password"
                    autoComplete="password"
                    textContentType="password"
                    leftIcon={(color: string) => <PasswordIcon color={color} />}
                  />
                )}
              </Field>
              <Field
                name="new"
                validate={composeValidators(required, minLength(6))}>
                {({ input, meta }) => (
                  <Input
                    meta={meta}
                    input={input}
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="New password"
                    autoComplete="password"
                    textContentType="password"
                    leftIcon={(color: string) => <PasswordIcon color={color} />}
                  />
                )}
              </Field>
              <Field
                name="confirm"
                validate={composeValidators(
                  required,
                  minLength(6),
                  isSame(values.new),
                )}>
                {({ input, meta }) => (
                  <Input
                    meta={meta}
                    input={input}
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Confirm password"
                    autoComplete="password"
                    textContentType="password"
                    leftIcon={(color: string) => <PasswordIcon color={color} />}
                  />
                )}
              </Field>
            </View>
            <Button
              style={styles.button}
              title="Change password"
              onPress={handleSubmit}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  forgotPass: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  formFileds: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    maxHeight: 220,
  },
  input: {
    flex: 1,
    width: '100%',
    marginBottom: 8,
  },
  button: {},
});
