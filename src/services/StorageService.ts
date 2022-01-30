import AsyncStorage from '@react-native-async-storage/async-storage';

enum Key {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  ONBOARDING_STATE = 'ONBOARDING_STATE',
}

export const StorageService = {
  setAccessToken: (accessToken: string) => {
    console.log('accessToken', accessToken);
    return AsyncStorage.setItem(Key.ACCESS_TOKEN, accessToken);
  },
  removeAssessToken: () => {
    return AsyncStorage.removeItem(Key.ACCESS_TOKEN);
  },
  getAssessToken: () => {
    return AsyncStorage.getItem(Key.ACCESS_TOKEN);
  },
  setOnboarding: (onboardingState: string) => {
    console.log('onboardingState', onboardingState);
    return AsyncStorage.setItem(Key.ONBOARDING_STATE, onboardingState);
  },
  removeOnboarding: () => {
    return AsyncStorage.removeItem(Key.ONBOARDING_STATE);
  },
  getOnboarding: () => {
    return AsyncStorage.getItem(Key.ONBOARDING_STATE);
  },
};
