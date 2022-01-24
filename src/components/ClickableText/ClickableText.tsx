import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from 'components/Text';

interface ClickableTextInterface {
  text: string;
  style: any;
  onPress: () => void;
}

const ClickableText = ({ text, style, onPress }: ClickableTextInterface) => {
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
