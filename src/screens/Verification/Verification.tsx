import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import BackButton from 'components/BackButton/BackButton';
import { useTranslation } from 'context/LanguageContext';
import { Text } from 'components/Text';
import ClickableText from 'components/ClickableText';
import Button from 'components/Button';

const Verification = ({ navigation }: any) => {
  const {
    VerificationTitle,
    VerificationLabel,
    VerificationResend,
    VerificationContinue,
  } = useTranslation();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <BackButton onPress={() => navigation.navigate('Auth')} />
        <Text title text={VerificationTitle} style={styles.title} />
        <Text label text={VerificationLabel} style={styles.label} />
        <ClickableText
          text={VerificationResend}
          onPress={''}
          style={styles.resendButton}
        />
        <Button title={VerificationContinue} />
      </View>
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 12,
  },
  resendButton: {
    alignSelf: 'center',
  },
});
