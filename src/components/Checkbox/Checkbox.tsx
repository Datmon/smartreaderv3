import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CheckboxIcon from 'assets/svg/CheckboxIcon';

const Checkbox = ({ isActive, style }: { isActive: boolean; style?: any }) => {
  return (
    <View style={[styles.container, isActive && styles.active, style]}>
      {isActive && <CheckboxIcon />}
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    height: 24,
    width: 24,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    borderWidth: 0,
    backgroundColor: '#455AF7',
  },
});
