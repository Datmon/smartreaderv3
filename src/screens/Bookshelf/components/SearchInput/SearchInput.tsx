import { Platform, StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'context/LanguageContext';
import { SearchIcon } from 'assets/svg';

const SearchInput = ({
  value,
  onChangeText,
  style,
}: {
  value: string;
  onChangeText: (value: string) => void;
  style?: any;
}) => {
  const { BookshelfSearchPlaceholder } = useTranslation();
  return (
    <View style={styles.container}>
      <SearchIcon />
      <TextInput
        placeholder={BookshelfSearchPlaceholder}
        value={value}
        onChangeText={onChangeText}
        style={[
          style,
          styles.textInput,
          Platform.OS === 'ios' ? styles.fontIos : styles.fontAndroid,
        ]}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingLeft: 16,
  },
  textInput: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  fontIos: { fontFamily: 'Euclid Circular A' },
  fontAndroid: { fontFamily: 'EuclidCircular-400' },
});