import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

interface IInput {
  style: any;
  onChangeText: (value: string) => void;
  value?: string;
  placeholder: string;
  leftIcon?: any;
  secureTextEntry?: boolean;
  rightIcon?: any;
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
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  useEffect(() => {
    setVisiblePassword(secureTextEntry);
  }, [secureTextEntry]);

  return (
    <View>
      <View style={styles.leftIcon}>{leftIcon}</View>
      <TextInput
        autoCapitalize={'none'}
        style={[style, styles.input]}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={visiblePassword}
        placeholder={placeholder}
      />
      <TouchableOpacity
        style={styles.rightIcon}
        activeOpacity={0.6}
        onPress={() => setVisiblePassword(!visiblePassword)}>
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 45,
  },
  leftIcon: {
    position: 'absolute',
    top: 32,
    left: 18,
  },
  rightIcon: {
    position: 'absolute',
    top: 32,
    right: 18,
  },
});
