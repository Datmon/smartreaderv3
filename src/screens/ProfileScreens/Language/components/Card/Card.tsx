/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { Text } from 'components/Text';
import Checkbox from 'components/Checkbox';

const Card = ({
  title,
  onPress,
  image,
  style,
  active = false,
}: {
  title: string;
  onPress: () => void;
  image: any;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, active && { borderColor: '#455AF7' }, style]}
      onPress={onPress}>
      <View style={styles.label}>
        <Image source={image} style={styles.image} />
        <Text text={title} />
      </View>
      <Checkbox isActive={active} />
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'white',
    padding: 24,
    height: 72,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'white',
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
