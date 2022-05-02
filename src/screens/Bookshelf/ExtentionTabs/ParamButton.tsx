import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from 'components/Text';
import { useDispatch } from 'react-redux';
import { actions } from 'store';

const ParamButton = ({
  format,
  active,
}: {
  format: string;
  active: boolean;
}) => {
  return active ? (
    <View style={[styles.container, styles.active]}>
      <Text text={format} style={[styles.text, styles.activeText]} />
    </View>
  ) : (
    <TouchableOpacity onPress={() => setActive()}>
      <View style={[styles.container]}>
        <Text text={format} style={styles.text} />
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
