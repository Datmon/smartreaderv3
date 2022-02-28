import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { Text } from 'components/Text';
import { useTranslation } from 'context/LanguageContext';
import SearchInput from './SearchInput';
import { CrossIcon, FilterIcon, PlusSign } from 'assets/svg';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import BookCard from './BookCard';
import FormatTabs from './FormatTabs';
import SortCheckbox from './SortCheckbox';
import CustomFilters from './CustomFilters';
import { IApiBook, IBook } from 'types/interfaces';
import { PolyfillBlob, ReactNativeBlobUtilFile } from 'react-native-blob-util';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {
  PERMISSIONS,
  request,
  openLimitedPhotoLibraryPicker,
  check,
  RESULTS,
} from 'react-native-permissions';
import {} from 'react-native-permissions';
import { books } from 'api';

type Rationale = {
  title: string;
  message: string;
  buttonPositive?: string;
  buttonNegative?: string;
  buttonNeutral?: string;
};

const Bookshelf = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Bookshelf'>) => {
  const dispatch = useDispatch();

  const scrollViewRef = useRef();

  const { BookshelfContext } = useTranslation();
  const { filter, title } = BookshelfContext;

  const filtedBooks = useSelector(selectors.books.selectBooksWithFilters);
  const allBooks = useSelector(selectors.books.selectAllBooks);

  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [addingBook, setAddingBook] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [settedFiltredBooks, setFiltredBooks] = useState<IApiBook[]>([]);

  const sortAndSearchBooks = useMemo(() => {
    if (settedFiltredBooks.length > 0 && !isLoading) {
      console.log('settedFiltredBooks', settedFiltredBooks);

      return settedFiltredBooks.filter(
        post =>
          post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          post.author.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }
  }, [settedFiltredBooks, searchValue, isLoading]);

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const setNewFiltedBooks = () => {
    setFiltredBooks(filtedBooks);
    modalizeRef.current?.close();
    scrollViewRef.current.scrollTo(0);
  };

  const handleError = (err: any) => {
    //Alert.alert('Error', err);
    console.log('Error', err);
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const getBooksMeta = async () => {
    setIsLoading(true);
    const res = await dispatch(actions.books.getBooks());
    setIsLoading(false);
    setRefreshing(false);

    console.log('filtedBooks', filtedBooks);
    console.log('allBooks', allBooks);
  };

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getBooksMeta();
  }, []);

  const handleUpload = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'formSheet',
        copyTo: 'cachesDirectory',
        type: [types.allFiles],
      });
      if (!pickerResult.copyError) {
        setAddingBook(true);

        console.log('pickerResult', pickerResult);
        const res = await books.postBook(pickerResult);
        console.log('res', res);
        getBooksMeta();
        setAddingBook(false);
      }
    } catch (e) {
      console.log('for');
      setAddingBook(false);
      handleError(e);
    }
  };

  check(PERMISSIONS.IOS.PHOTO_LIBRARY)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch(error => {
      // …
    });

  useEffect(() => {
    getBooksMeta();
    request(PERMISSIONS.IOS.MEDIA_LIBRARY);
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
    //converter();
  }, []);

  useEffect(() => {
    setFiltredBooks(filtedBooks);
  }, [filtedBooks]);

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
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {sortAndSearchBooks &&
            !isLoading &&
            sortAndSearchBooks.map((book: any) => (
              <BookCard
                key={book.id}
                data={book}
                onPress={() => navigation.push('ReadingSpace')}
              />
            ))}
          {addingBook && (
            <View style={styles.emptyBook}>
              <ActivityIndicator size="large" color="#455AF7" />
            </View>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleUpload}>
        <PlusSign />
      </TouchableOpacity>
      <Portal>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight={true}
          handlePosition="inside">
          <View style={styles.filterContainer}>
            <Text text={filter.title} header1 style={styles.filterTitle} />
            <Text text={filter.files} header2 style={styles.filterFiles} />
            <FormatTabs />
            <Text text={filter.sortBy} header2 style={styles.sortBy} />
            <SortCheckbox />
            <CustomFilters style={styles.customFilters} />
            <View style={styles.modalButtons}>
              {filtedBooks.length !== allBooks.length && (
                <TouchableOpacity style={styles.resetButton}>
                  <CrossIcon />
                  <Text text={filter.reset} style={styles.resetText} />
                </TouchableOpacity>
              )}

              <Button
                title={
                  filtedBooks.length === allBooks.length
                    ? `${filter.buttonShow} ${filter.buttonAll}`
                    : `${filter.buttonShow} ${filtedBooks.length} ${filter.buttonResults}`
                }
                style={styles.buttonShow}
                onPress={setNewFiltedBooks}
              />
            </View>
          </View>
        </Modalize>
      </Portal>
    </SafeAreaView>
  );
};

export default Bookshelf;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
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
    flex: 1,
    height: 44,
    width: 'auto',
  },
  sortBy: {
    marginTop: 24,
    marginBottom: 12,
  },
  customFilters: {
    marginTop: 24,
  },
  resetButton: {
    height: 30,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    textAlign: 'center',
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalButtons: {
    flex: 1,
    marginTop: 40,
    marginBottom: 50,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row-reverse',
  },
  resetText: { width: 'auto', color: '#718096', marginLeft: 10 },
  scrollView: {
    minHeight: '100%',
  },
  emptyBook: {
    height: 90,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 16,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
