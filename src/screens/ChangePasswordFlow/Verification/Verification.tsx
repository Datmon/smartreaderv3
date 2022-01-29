import {
  SafeAreaView,
  StyleSheet,
  View,
  Text as RNText,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import BackButton from 'components/BackButton/BackButton';
import { useTranslation } from 'context/LanguageContext';
import { Text } from 'components/Text';
import ClickableText from 'components/ClickableText';
import Button from 'components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

type RootStackParamList = {
  Verification: undefined;
  CreateNewPassword: undefined;
};

const Verification = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Verification'>) => {
  const {
    VerificationTitle,
    VerificationLabel,
    VerificationResend,
    VerificationContinue,
  } = useTranslation();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
            <Text title text={VerificationTitle} style={styles.title} />
            <Text label text={VerificationLabel} style={styles.label} />
            <CodeField
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={4}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <RNText
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </RNText>
              )}
            />
            <ClickableText
              text={VerificationResend}
              onPress={() => {}}
              style={styles.resendButton}
            />
          </View>
          <Button
            title={VerificationContinue}
            onPress={() => navigation.navigate('CreateNewPassword')}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    height: '100%',
    justifyContent: 'space-between',
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
  codeFieldRoot: { marginVertical: 15, marginHorizontal: 36 },
  cell: {
    width: 56,
    height: 56,
    fontSize: 28,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#455AF7',
  },
});
