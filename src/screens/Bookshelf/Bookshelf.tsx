import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { actions } from 'store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { StorageService } from 'services';
import { Text } from 'components/Text';
import { useTranslation } from 'context/LanguageContext';
import SearchInput from './components/SearchInput';
import { FilterIcon, PlusSign } from 'assets/svg';

const Bookshelf = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Bookshelf'>) => {
  const dispatch = useDispatch();

  const { BookshelfTitle } = useTranslation();

  const [searchValue, setSearchValue] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text text={BookshelfTitle} title />
        <View style={styles.searchTab}>
          <SearchInput value={searchValue} onChangeText={setSearchValue} />
          <TouchableOpacity>
            <View style={styles.filterButton}>
              <FilterIcon />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <PlusSign />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Bookshelf;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 10,
    height: '100%',
  },
  searchTab: {
    flexDirection: 'row',
    height: 48,
  },
  filterButton: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginLeft: 8,
  },
  addButton: {
    position: 'absolute',
    width: 56,
    height: 56,
    margin: 24,
    borderRadius: 50,
    backgroundColor: '#455AF7',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
