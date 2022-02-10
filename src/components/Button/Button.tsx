import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from 'components/Text';

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
      <Text text={title} style={styles.text} clickbale />
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#455AF7',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  disabled: {},
});
