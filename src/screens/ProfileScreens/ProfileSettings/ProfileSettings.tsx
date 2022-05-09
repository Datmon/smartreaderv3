import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import PhotoIcon from 'assets/svg/PhotoIcon';
import Input from 'components/Input';
import Button from 'components/Button';
import { Field, Form } from 'react-final-form';
import {
  composeValidators,
  isEmail,
  isSame,
  minLength,
  required,
} from 'utils/validation';
import { EmailIcon, NicknameIcon, PasswordIcon } from 'assets/svg';
import ClickableText from 'components/ClickableText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { useSelector } from 'react-redux';
import { selectors } from 'store';

const ProfileSettings = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ProfileSettings'>) => {
  const onSubmit = () => {};
  const { email, username, password } = useSelector(
    selectors.auth.selectUserData,
  );

  const avatar = useSelector(selectors.auth.selectUserPhoto);

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.image}>
          <Image style={styles.imageContainer} source={{ uri: avatar }} />
          <View style={styles.imageButton}>
            <PhotoIcon />
          </View>
        </TouchableOpacity>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <View style={styles.form}>
              <View style={styles.formFileds}>
                <Field
                  name="username"
                  initialValue={username}
                  validate={composeValidators(required, minLength(6))}>
                  {({ input, meta }) => (
                    <Input
                      meta={meta}
                      input={input}
                      style={styles.input}
                      placeholder="Username"
                      autoComplete="username"
                      textContentType="username"
                      leftIcon={(color: string) => (
                        <NicknameIcon color={color} />
                      )}
                    />
                  )}
                </Field>
                <Field
                  initialValue={email}
                  name="email"
                  validate={composeValidators(required, isEmail)}>
                  {({ input, meta }) => (
                    <Input
                      meta={meta}
                      input={input}
                      style={styles.input}
                      placeholder="Email"
                      autoComplete="email"
                      textContentType="emailAddress"
                      secureTextEntry={false}
                      leftIcon={(color: string) => <EmailIcon color={color} />}
                    />
                  )}
                </Field>
                <Field
                  name="password"
                  validate={composeValidators(
                    required,
                    minLength(6),
                    isSame(password),
                  )}>
                  {({ input, meta }) => (
                    <Input
                      meta={meta}
                      input={input}
                      style={styles.input}
                      secureTextEntry={true}
                      placeholder="Password"
                      autoComplete="password"
                      textContentType="password"
                      leftIcon={(color: string) => (
                        <PasswordIcon color={color} />
                      )}
                    />
                  )}
                </Field>
                <ClickableText
                  style={styles.forgotPass}
                  text={'Change password'}
                  onPress={() => {
                    navigation.navigate('ChangePassword');
                  }}
                />
              </View>
              <Button
                style={styles.button}
                title="Save changes"
                onPress={handleSubmit}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  image: {
    height: 124,
    width: 124,
    backgroundColor: '#718096',
    borderRadius: 8,
    marginBottom: 30,
    alignSelf: 'center',
  },
  imageContainer: {
    height: 124,
    width: 124,
  },
  imageButton: {
    position: 'absolute',
    width: 28,
    right: -12,
    bottom: -12,
  },
  input: {
    flex: 1,
    width: '100%',
    marginBottom: 12,
  },
  button: {},
  forgotPass: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  formFileds: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    maxHeight: 250,
  },
});
