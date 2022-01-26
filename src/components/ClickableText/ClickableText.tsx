import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from 'components/Text';

interface IClickableText {
  text: string;
  onPress: () => void;
  style?: any;
}

const ClickableText = ({ text, style, onPress }: IClickableText) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => onPress()}
      activeOpacity={0.6}>
      <Text clickbale text={text} />
    </TouchableOpacity>
  );
};

export default ClickableText;

const styles = StyleSheet.create({
  button: {},
});
