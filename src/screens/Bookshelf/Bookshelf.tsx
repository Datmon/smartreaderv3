import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { actions } from 'store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { StorageService } from 'services';
import { Text } from 'components/Text';
import { useTranslation } from 'context/LanguageContext';
import SearchInput from './SearchInput';
import { FilterIcon, PlusSign } from 'assets/svg';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import BookCard from './BookCard';
import FormatTabs from './FormatTabs';
import SortCheckbox from './SortCheckbox';
import CustomFilters from './CustomFilters';

const Bookshelf = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Bookshelf'>) => {
  const dispatch = useDispatch();

  const { BookshelfContext } = useTranslation();
  const { filter, title } = BookshelfContext;

  const [searchValue, setSearchValue] = useState('');

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text text={title} title style={styles.title} />
        <View style={styles.searchTab}>
          <SearchInput value={searchValue} onChangeText={setSearchValue} />
          <TouchableOpacity onPress={onOpen}>
            <View style={styles.filterButton}>
              <FilterIcon />
            </View>
          </TouchableOpacity>
        </View>
        <BookCard />
      </View>
      <TouchableOpacity style={styles.addButton}>
        <PlusSign />
      </TouchableOpacity>
      <Portal>
        <Modalize ref={modalizeRef} adjustToContentHeight={true}>
          <View style={styles.filterContainer}>
            <Text text={filter.title} header1 style={styles.filterTitle} />
            <Text text={filter.files} header2 style={styles.filterFiles} />
            <FormatTabs />
            <Text text={filter.sortBy} header2 style={styles.sortBy} />
            <SortCheckbox />
            <CustomFilters style={styles.customFilters} />
            <Button
              title={`${filter.buttonShow} ${filter.buttonAll}`}
              style={styles.buttonShow}
            />
          </View>
        </Modalize>
      </Portal>
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
  title: { marginTop: 24, marginBottom: 16 },
  searchTab: {
    flexDirection: 'row',
    height: 48,
    marginBottom: 24,
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
  filterContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  filterTitle: {
    paddingVertical: 24,
    alignSelf: 'center',
  },
  filterFiles: {
    marginBottom: 12,
  },
  buttonShow: {
    marginTop: 40,
    marginBottom: 50,
    height: 44,
  },
  sortBy: {
    marginTop: 24,
    marginBottom: 12,
  },
  customFilters: {
    marginTop: 24,
  },
});
