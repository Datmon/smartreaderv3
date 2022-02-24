import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Text } from 'components/Text';

const ParamButton = ({
  active,
  text,
  onPress,
}: {
  active?: boolean;
  text: string;
  onPress: (isActive: boolean) => void;
}) => {
  const [isActive, setIsActive] = useState(active);
  return isActive ? (
    <TouchableOpacity
      onPress={() => {
        setIsActive(false);
        onPress(false);
      }}>
      <View style={[styles.container, styles.active]}>
        <Text text={text} style={[styles.text, styles.activeText]} />
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => {
        setIsActive(true);
        onPress(true);
      }}>
      <View style={[styles.container]}>
        <Text text={text} style={styles.text} />
      </View>
    </TouchableOpacity>
  );
};

export default ParamButton;

const styles = StyleSheet.create({
  container: {
    height: 32,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  text: {
    color: '#718096',
  },
  active: {
    backgroundColor: '#455AF7',
    borderWidth: 0,
  },
  activeText: {
    color: 'white',
  },
});
