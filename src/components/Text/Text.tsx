import { StyleSheet, Text } from 'react-native';
import React from 'react';

//TODO: TS for customStyles
const CustomText = ({
  text,
  style,
  clickbale,
}: {
  text: string;
  style?: any;
  clickbale?: boolean;
}) => {
  return (
    <Text style={[styles.regular, style, clickbale && styles.button]}>
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
