/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Svg, { G, Circle } from 'react-native-svg';
import { Text } from 'components/Text';

interface Props {
  percentage: number;
  scrollTo: () => void;
  navigation: any;
}

const NextButton = ({ percentage, scrollTo }: Props) => {
  const size = 72;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const [visibleStartButton, setVisibleStartButton] = useState<boolean>(false);

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
    percentage === 100
      ? setVisibleStartButton(true)
      : setVisibleStartButton(false);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(value => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;
      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      {!visibleStartButton ? (
        <TouchableOpacity
          onPress={scrollTo}
          style={[styles.button]}
          activeOpacity={0.6}>
          <Svg width={size} height={size}>
            <G rotation="-90" origin={center}>
              <Circle
                stroke="#E6E7E8"
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
              />
              <Circle
                ref={progressRef}
                stroke="#455af7"
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
              />
            </G>
          </Svg>
          <Image
            source={require('../../assets/images/right_arrow.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={scrollTo}
          style={[styles.getStartedButton]}
          activeOpacity={0.6}>
          <Text text="Get started" style={styles.text} />
          <Image
            source={require('../../assets/images/right_arrow.png')}
            style={styles.imageWithText}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#455af7',
    borderRadius: 50,
    width: 56,
    height: 56,
  },
  image: {
    width: 25,
    height: 25,
    position: 'absolute',
    alignSelf: 'center',
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#455af7',
    height: 56,
    borderRadius: 16,
    width: 160,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  imageWithText: {
    width: 25,
    height: 25,
  },
});
