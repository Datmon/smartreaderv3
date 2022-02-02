import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface IButton {
  title: string;
  disabled?: boolean;
  style?: any;
  onPress?: () => void;
}

const Button = ({ title, style, disabled, onPress }: IButton) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#455AF7',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  disabled: {},
});
