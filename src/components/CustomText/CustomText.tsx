import { StyleSheet, Text } from 'react-native';
import React from 'react';

//TODO: TS for customStyles
const CustomText = ({
  text,
  customStyles,
}: {
  text: string;
  customStyles?: any;
}) => {
  return <Text style={[styles.regular, customStyles]}>{text}</Text>;
};

export default CustomText;

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Euclid Circular A',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'Euclid Circular A',
    fontWeight: '500',
  },
});
