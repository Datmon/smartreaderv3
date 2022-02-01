import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'context/LanguageContext';
import { Text } from 'components/Text';
import Button from 'components/Button';
import BackButton from 'components/BackButton/BackButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';

const SuccessChanged = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SuccessChanged'>) => {
  const { SuccessChangedTitle, SuccessChangedLabel, SuccessChangedLogin } =
    useTranslation();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.content}>
            <Image
              source={require('../../../assets/images/success_changed.png')}
              style={styles.image}
            />
            <Text title text={SuccessChangedTitle} style={styles.title} />
            <Text label text={SuccessChangedLabel} style={styles.label} />
          </View>
        </View>
        <Button
          title={SuccessChangedLogin}
          onPress={() => navigation.navigate('Auth')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SuccessChanged;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    height: '100%',
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: '10%',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 18,
  },
  label: {
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 173,
    resizeMode: 'contain',
  },
});
