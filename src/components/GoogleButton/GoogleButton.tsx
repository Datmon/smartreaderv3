import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTranslation } from 'context/LanguageContext';
import { Text } from 'components/Text';

const GoogleButton = ({ onPress }: { onPress: () => void }) => {
  const { GoogleButtonLabel } = useTranslation();
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress()}>
      <Image
        source={require('../../assets/images/google.png')}
        style={styles.image}
      />
      <Text text={GoogleButtonLabel} />
    </TouchableOpacity>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    height: 56,
    flexDirection: 'row',
  },
  image: {
    height: 20,
    resizeMode: 'contain',
    marginBottom: 5,
    marginHorizontal: 4,
  },
});
