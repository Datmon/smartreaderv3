import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';

interface IInput {
  style: any;
  onChangeText: (value: string) => void;
  value?: string;
  placeholder: string;
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
  leftIcon,
  rightIcon,
}: IInput) => {
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
        style={[
          styles.input,
          isFocus ? { borderColor: '#455AF7' } : { borderColor: '#E2E8F0' },
        ]}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={isVisiblePassword}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.rightIcon}
          activeOpacity={0.6}
          onPress={() => setIsVisiblePassword(!isVisiblePassword)}>
          {rightIcon && rightIcon(isVisiblePassword ? '#718096' : '#455AF7')}
        </TouchableOpacity>
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
});
