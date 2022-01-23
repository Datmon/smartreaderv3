import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

interface CustomInputInterface {
  style: any;
  onChangeText: (value: string) => void;
  value: string | undefined;
  secureTextEntry?: boolean;
  placeholder: string;
}

const CustomInput = ({
  style,
  onChangeText,
  value,
  secureTextEntry,
  placeholder,
}: CustomInputInterface) => {
  return (
    <TextInput
      style={[style, styles.input]}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {},
});
