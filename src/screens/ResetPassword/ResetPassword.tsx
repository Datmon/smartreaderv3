import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import BackButton from 'components/BackButton/BackButton';
import { Text } from 'components/Text';
import { useTranslation } from 'context/LanguageContext';
import Input from 'components/Input';
import { EmailIcon } from 'assets/svg';
import Button from 'components/Button';

const ResetPassword = ({ navigation }: any) => {
  const { ResetTitle, ResetLabel, ResetButton } = useTranslation();
  const [email, setEmail] = useState<string>('');
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <BackButton onPress={() => navigation.navigate('Auth')} />
        <Text title text={ResetTitle} style={styles.title} />
        <Text label text={ResetLabel} style={styles.label} />
        <Input
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          placeholder="Email"
          secureTextEntry={false}
          leftIcon={(color: string) => <EmailIcon color={color} />}
        />
        <Button
          style={styles.button}
          title={ResetButton}
          onPress={() => navigation.navigate('Verification')}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  input: {},
  title: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 28,
  },
  button: {},
});
