import { Platform, StyleSheet, Text } from 'react-native';
import React from 'react';

//TODO: TS for customStyles
const CustomText = ({
  text,
  style,
  clickbale,
  title,
  label,
  error,
}: {
  text: string;
  style?: any;
  clickbale?: boolean;
  title?: boolean;
  label?: boolean;
  error?: boolean;
}) => {
  const iosPlatform = Platform.OS === 'ios' ? 'ios' : 'android';
  return (
    <Text
      style={
        iosPlatform === 'ios'
          ? [
              stylesIos.regular,
              clickbale && stylesIos.button,
              title && stylesIos.title,
              label && stylesIos.label,
              error && stylesIos.error,
              style,
            ]
          : [
              stylesAndroid.regular,
              clickbale && stylesAndroid.button,
              title && stylesAndroid.title,
              label && stylesAndroid.label,
              error && stylesAndroid.error,
              style,
            ]
      }>
      {text}
    </Text>
  );
};

export default CustomText;

const stylesAndroid = StyleSheet.create({
  regular: {
    fontFamily: 'EuclidCircular-400',
    color: 'black',
  },
  button: {
    color: 'blue',
    fontFamily: 'EuclidCircular-600',
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontFamily: 'EuclidCircular-500',
    color: '#1A202C',
  },
  label: {
    fontSize: 16,
    color: '#718096',
  },
  error: {
    fontFamily: 'EuclidCircular-400',
    marginLeft: 14,
    color: 'red',
    fontSize: 14,
    marginBottom: -4,
    marginTop: 1,
  },
});

const stylesIos = StyleSheet.create({
  regular: {
    fontFamily: 'Euclid Circular A',
    fontWeight: '400',
    color: 'black',
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
    color: '#718096',
  },
  error: {
    fontWeight: '400',
    marginLeft: 14,
    color: 'red',
    fontSize: 14,
    marginBottom: -4,
    marginTop: 1,
  },
});
