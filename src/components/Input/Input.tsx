/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Text } from 'components/Text';

interface IInput {
  style: any;
  onChangeText: (value: string) => void;
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
  rightIcon?: (color: string) => ReactElement;
}

const Input = ({
  style,
  onChangeText,
  value,
  secureTextEntry = false,
  placeholder,
  autoComplete,
  textContentType,
  leftIcon,
  rightIcon,
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
      {/* @ts-ignore */}
      <TextInput
        {...input}
        autoCapitalize={'none'}
        style={[
          styles.input,
          {
            borderColor:
              meta && meta.touched && meta.error
                ? 'red'
                : isFocus
                ? '#455AF7'
                : '#E2E8F0',
          },
        ]}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={isVisiblePassword}
        placeholder={placeholder}
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
          {rightIcon && rightIcon(isVisiblePassword ? '#718096' : '#455AF7')}
        </TouchableOpacity>
      )}
      {meta && meta.touched && meta.error && (
        <Text text={meta.error} style={styles.errorMessage} />
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
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
  errorMessage: {
    marginLeft: 14,
    color: 'red',
    fontSize: 14,
    marginBottom: -4,
    marginTop: 1,
  },
});
