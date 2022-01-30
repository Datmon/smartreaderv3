import { StyleSheet, Text } from 'react-native';
import React from 'react';

//TODO: TS for customStyles
const CustomText = ({
  text,
  style,
  clickbale,
  title,
  label,
}: {
  text: string;
  style?: any;
  clickbale?: boolean;
  title?: boolean;
  label?: boolean;
}) => {
  return (
    <Text
      style={[
        styles.regular,
        clickbale && styles.button,
        title && styles.title,
        label && styles.label,
        style,
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
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#1A202C',
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: '#718096',
  },
});
