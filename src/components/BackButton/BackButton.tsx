import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const BackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.backButton}>
      <Image
        source={require('../../assets/images/left_arrow.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    height: 12,
    width: 7,
  },
});
