import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from 'components/Text';

interface IButton {
  title: string;
  disabled?: boolean;
  style?: any;
  onPress?: () => void;
  alternative?: boolean;
}

const Button = ({ title, style, disabled, onPress, alternative }: IButton) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        disabled && styles.disabled,
        alternative && styles.alternative,
      ]}
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled}>
      <Text
        text={title}
        style={[styles.text, alternative && styles.alternativeText]}
        header4={alternative ? true : false}
        clickbale
      />
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
  alternative: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#455AF7',
  },
  alternativeText: {
    color: '#27303F',
  },
});
