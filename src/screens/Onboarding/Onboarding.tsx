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

const Onboarding = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const slideRef = useRef(null as any);

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

  const scrollTo = () => {
    console.log('currentIndex', currentIndex);
    if (currentIndex < slides.length - 1) {
      slideRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log('last item');
      navigation.navigate('Auth');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatlist}
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
        onScrollToIndexFailed={() => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            slideRef.current?.scrollToIndex({ index: 0 });
          });
        }}
      />
      <Paginator data={slides} scrollX={scrollX} />
      <View style={styles.bottomPanel}>
        <Text
          style={styles.skipButton}
          onPress={() => navigation.navigate('SignIn')}>
          Skip
        </Text>
        <NextButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / slides.length)}
          navigation={navigation}
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
  flatlist: {
    flexGrow: 0,
    maxHeight: '100%',
  },
  bottomPanel: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  skipButton: {
    color: '#455AF7',
    fontSize: 16,
    fontWeight: '500',
  },
});
