import { useTranslation } from 'context/LanguageContext';
import React, { useState, useRef } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Animated,
  View,
  Text,
} from 'react-native';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';
import NextButton from './NextButton';
import CustomText from 'components/CustomText';

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    OnboardingTitle1,
    OnboardingDescription1,
    OnboardingTitle2,
    OnboardingDescription2,
    OnboardingTitle3,
    OnboardingDescription3,
  } = useTranslation();

  const slides = [
    {
      id: '1',
      title: OnboardingTitle1,
      description: OnboardingDescription1,
      image: require('../../assets/images/onboarding1.png'),
    },
    {
      id: '2',
      title: OnboardingTitle2,
      description: OnboardingDescription2,
      image: require('../../assets/images/onboarding1.png'),
    },
    {
      id: '3',
      title: OnboardingTitle3,
      description: OnboardingDescription3,
      image: require('../../assets/images/onboarding1.png'),
    },
  ];

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null as any);

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slideRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log('last item');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slideRef}
      />
      <Paginator data={slides} scrollX={scrollX} />
      <View style={styles.bottomPanel}>
        <Text>Skip</Text>
        <NextButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / slides.length)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomPanel: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
});
