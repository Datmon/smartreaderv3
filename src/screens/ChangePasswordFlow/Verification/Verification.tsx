import {
  SafeAreaView,
  StyleSheet,
  View,
  Text as RNText,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { actions } from 'store/ducks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from 'types';
import { selectors } from 'store';
import LoadingIndicator from 'components/LoadingIndicator';

const Verification = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Verification'>) => {
  const {
    VerificationTitle,
    VerificationLabel,
    VerificationResend,
    VerificationContinue,
  } = useTranslation();

  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    getVerificationCode();
  }, []);

  useEffect(() => {
    value.length === 4 ? setIsDisabled(false) : setIsDisabled(true);
  }, [value]);

  const dispatch = useDispatch();
  const verificationCode = useSelector(selectors.auth.selectVerificationCode);

  const getVerificationCode = async () => {
    setIsLoading(true);
    const res: any = await dispatch(
      actions.verificate({ email: route.params.email }),
    );
    setIsLoading(false);
    console.log('verification: ', res);
  };

  const checkVerificationCode = () => {
    console.log('verificationCode: ', verificationCode, ' value: ', value);
    if (verificationCode && +verificationCode === +value) {
      route.params?.onVerification();
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.container}>
            <View>
              <BackButton onPress={() => navigation.goBack()} />
              <Text title text={VerificationTitle} style={styles.title} />
              <Text label text={VerificationLabel} style={styles.label} />
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={e => {
                  setValue(e);
                  setIsError(false);
                }}
                cellCount={4}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <RNText
                    key={index}
                    style={[
                      styles.cell,
                      isFocused && styles.focusCell,
                      isError && { borderColor: 'red' },
                    ]}
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
              onPress={checkVerificationCode}
              disabled={isDisabled}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <LoadingIndicator isLoading={isLoading} />
    </>
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
    paddingTop: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    textAlign: 'center',
    color: 'black',
  },
  focusCell: {
    borderColor: '#455AF7',
  },
});
