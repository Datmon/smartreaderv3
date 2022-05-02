import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from 'components/Text';
import { useTranslation } from 'context/LanguageContext';
import Button from 'components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';

const Organaizer = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Organaizer'>) => {
  const { UnfilledScreens } = useTranslation();
  const { title, label, button } = UnfilledScreens;
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={require('../../assets/images/stillWorking.png')} />
        <Text text={title} title style={styles.title} />
        <Text text={label} label style={styles.label} />
        <Button
          title={button}
          style={styles.button}
          onPress={() => navigation.navigate('Bookshelf')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Organaizer;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 40,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
  },
});
