import { StyleSheet, Text } from 'react-native';
import React from 'react';

//TODO: TS for customStyles
const CustomText = ({
  text,
  style,
  clickbale,
  visible = true,
}: {
  text: string;
  style?: any;
  clickbale?: boolean;
  visible?: boolean;
}) => {
  return (
    <Text
      style={[
        styles.regular,
        style,
        clickbale && styles.button,
        { display: visible ? 'flex' : 'none' },
      ]}>
      {text}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Euclid Circular A',
  },
  button: {
    color: 'blue',
    fontWeight: '600',
    fontSize: 14,
  },
});
