import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CustomInput = () => {
  return (
    <TextInput style={styles.input} onChangeText={setEmail} value={email} />
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
