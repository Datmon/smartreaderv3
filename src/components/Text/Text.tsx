import { Platform, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import React from 'react';
import { TextStyle } from 'pdfjs-dist/types/src/display/api';

//TODO: TS for customStyles
const CustomText = ({
  text,
  style,
  clickbale,
  title,
  label,
  error,
  header0,
  header1,
  header2,
  header3,
  header4,
  description,
  body14,
}: {
  text: string;
  style?: StyleProp<any>;
  clickbale?: boolean;
  title?: boolean;
  label?: boolean;
  error?: boolean;
  header0?: boolean;
  header1?: boolean;
  header2?: boolean;
  header3?: boolean;
  header4?: boolean;
  description?: boolean;
  body14?: boolean;
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
              header0 && stylesIos.header0,
              header1 && stylesIos.header1,
              header2 && stylesIos.header2,
              header3 && stylesIos.header3,
              header4 && stylesIos.header4,
              description && stylesIos.description,
              body14 && stylesIos.body14,
              style,
            ]
          : [
              stylesAndroid.regular,
              clickbale && stylesAndroid.button,
              title && stylesAndroid.title,
              label && stylesAndroid.label,
              error && stylesAndroid.error,
              header0 && stylesAndroid.header0,
              header1 && stylesAndroid.header1,
              header2 && stylesAndroid.header2,
              header3 && stylesAndroid.header3,
              header4 && stylesAndroid.header4,
              description && stylesAndroid.description,
              body14 && stylesAndroid.body14,

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
    color: '#455AF7',
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
  header0: {
    fontSize: 24,
    fontFamily: 'EuclidCircular-500',
  },
  header1: {
    fontSize: 20,
    fontFamily: 'EuclidCircular-500',
  },
  header2: {
    fontSize: 18,
    fontFamily: 'EuclidCircular-500',
  },
  header3: {
    fontSize: 16,
    fontFamily: 'EuclidCircular-500',
  },
  header4: {
    fontSize: 14,
    fontFamily: 'EuclidCircular-500',
  },
  description: {
    fontFamily: 'EuclidCircular-400',
    fontSize: 12,
    color: '#718096',
  },
  body14: {
    fontSize: 14,
    fontFamily: 'EuclidCircular-400',
  },
});

const stylesIos = StyleSheet.create({
  regular: {
    fontFamily: 'Euclid Circular A',
    fontWeight: '400',
    color: 'black',
  },
  button: {
    color: '#455AF7',
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
  header0: {
    fontSize: 24,
    fontWeight: '500',
  },
  header1: {
    fontSize: 20,
    fontWeight: '500',
  },
  header2: {
    fontSize: 18,
    fontWeight: '500',
  },
  header3: {
    fontSize: 16,
    fontWeight: '500',
  },
  header4: {
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    fontWeight: '400',
    fontSize: 12,
    color: '#718096',
  },
  body14: {
    fontSize: 14,
    fontWeight: '400',
  },
});
