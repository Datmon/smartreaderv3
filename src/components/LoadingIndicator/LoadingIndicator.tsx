import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';

const LoadingIndicator = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <View
      style={[styles.indicatorBackGround, !isLoading && { display: 'none' }]}>
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color="#455AF7"
      />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  indicatorBackGround: {
    position: 'absolute',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  indicator: {
    alignSelf: 'center',
  },
});
