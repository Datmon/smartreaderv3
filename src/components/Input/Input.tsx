/* eslint-disable react-native/no-inline-styles */
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Text } from 'components/Text';
import { ShowPasswordIcon } from 'assets/svg';
import HidePasswordIcon from 'assets/svg/HidePasswordIcon';

interface IInput {
  style: any;
  onChangeText?: (value: string) => void;
  autoComplete?: 'email' | 'password' | 'password-new' | 'username' | undefined;
  textContentType?:
    | 'emailAddress'
    | 'password'
    | 'newPassword'
    | 'username'
    | undefined;
  placeholder: string;
  value?: string;
  leftIcon?: (color: string) => ReactElement;
  secureTextEntry?: boolean;
}

const Input = ({
  style,
  secureTextEntry = false,
  placeholder,
  autoComplete,
  textContentType,
  leftIcon,
  meta,
  input,
}: FieldRenderProps<string, any> & IInput) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  useEffect(() => {
    setIsVisiblePassword(secureTextEntry);
  }, [secureTextEntry]);

  return (
    <View style={style}>
      <View style={styles.leftIcon}>
        {leftIcon && leftIcon(isFocus ? '#455AF7' : '#718096')}
      </View>
      <TextInput
        autoCapitalize={'none'}
        style={
          Platform.OS === 'ios'
            ? [
                styles.input,
                styles.fontIos,
                {
                  borderColor:
                    meta && meta.touched && meta.error
                      ? 'red'
                      : isFocus
                      ? '#455AF7'
                      : '#E2E8F0',
                },
                ,
              ]
            : [
                styles.input,
                styles.fontAndroid,
                {
                  borderColor:
                    meta && meta.touched && meta.error
                      ? 'red'
                      : isFocus
                      ? '#455AF7'
                      : '#E2E8F0',
                },
              ]
        }
        {...input}
        secureTextEntry={isVisiblePassword}
        placeholder={placeholder}
        placeholderTextColor={'#718096'}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        autoComplete={autoComplete}
        textContentType={textContentType}
        autoCorrect={false}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.rightIcon}
          activeOpacity={0.6}
          onPress={() => setIsVisiblePassword(!isVisiblePassword)}>
          {isVisiblePassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
        </TouchableOpacity>
      )}
      {meta && meta.touched && meta.error && <Text text={meta.error} error />}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  fontIos: { fontFamily: 'Euclid Circular A' },
  fontAndroid: { fontFamily: 'EuclidCircular-400' },
  input: {
    paddingHorizontal: 45,
    height: 56,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    borderRadius: 16,
    fontWeight: '500',
  },
  leftIcon: {
    position: 'absolute',
    top: 20,
    left: 18,
  },
  rightIcon: {
    position: 'absolute',
    top: 20,
    right: 18,
  },
});
