/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Image,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import Svg, { G, Circle } from 'react-native-svg';

interface Props {
  percentage: number;
  scrollTo: () => void;
}

const NextButton = ({ percentage, scrollTo }: Props) => {
  const size = 72;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      value => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;
        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      //@ts-ignore
      [percentage],
    );
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}>
        <Image
          source={require('../../assets/images/right_arrow.png')}
          style={[styles.image]}
        />
      </TouchableOpacity>
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
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#455af7',
    borderRadius: 50,
    width: 56,
    height: 56,
  },
  image: {
    width: 25,
    height: 25,
  },
});
