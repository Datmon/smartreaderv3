import { Text } from 'components/Text';
import React from 'react';
import { View, Image, useWindowDimensions, StyleSheet } from 'react-native';

interface Item {
  item: { id: string; title: string; description: string; image: any };
}

const OnboardingItem = ({ item }: Item) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.text}>
        <Text style={styles.title} text={item.title} />
        <Text style={styles.description} text={item.description} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  image: {
    justifyContent: 'center',
    resizeMode: 'contain',
    width: '100%',
    height: '65%',
    marginBottom: 48,
  },
  text: {
    flex: 0.4,
    width: '100%',
    paddingHorizontal: 25,
    height: '100%',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 12,
  },
  description: {
    fontWeight: '300',
    color: '#718096',
  },
});

export default OnboardingItem;
