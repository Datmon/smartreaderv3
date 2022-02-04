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
    flex: 1,
    paddingTop: 30,
    alignItems: 'flex-start',
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: '90%',
    height: '65%',
    marginBottom: 30,
  },
  text: {
    width: '100%',
    paddingHorizontal: 25,
  },
  title: {
    color: 'black',
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 12,
    height: 38,
  },
  description: {
    fontWeight: '300',
    color: '#718096',
  },
});

export default OnboardingItem;
