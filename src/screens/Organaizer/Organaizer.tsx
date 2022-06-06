import React, { useState } from 'react';
import { useTranslation } from 'context/LanguageContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Share,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';
import SettingsIcon from 'assets/svg/Settings';
import Bookmark from 'assets/svg/Bookmark';
import BookmarkComponent from 'components/Bookmark/Bookmark';
import { IBookmark } from 'store/ducks/books';
import ForwardIcon from 'assets/svg/Forward';
import ShareIcon from 'assets/svg/Share';
import DeleteIcon from 'assets/svg/Delete';
import { books } from 'api';

const Organaizer = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Organaizer'>) => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [activeModal, setActiveModal] = useState(false);
  const [bookID, setBookID] = useState('');
  const [bookPage, setBookPage] = useState(0);
  const [nameBook, setNameBook] = useState('');
  const { UnfilledScreens } = useTranslation();
  const annotaions = useSelector(selectors.books.selectAllAnnotations);
  const bookmarks = useSelector(selectors.books.selectAllBookmarks);
  const allPages = useSelector(selectors.books.selectAllPages);

  const dispatch = useDispatch();

  const onPressBookmarks = () => {
    if (activeTab !== 0) {
      setActiveTab(0);
    }
  };

  const onPressNotes = () => {
    if (activeTab !== 1) {
      setActiveTab(1);
    }
  };

  const goToBookmark = (bookId: string) => {
    setActiveModal(!activeModal);
    navigation.navigate('ReadingSpace', {
      bookId,
      pageNum: bookPage,
      saveNote: '',
      saveBookmark: '',
    });
  };

  const deleteBookmark = async () => {
    const bookmark1 = bookmarks.filter(item => item.bookId === bookID);
    let aaa = '';
    let bbb = '';
    let ccc = '';
    let fff = '';
    bookmark1.forEach(e => {
      bbb = e.bookmark[`${bookPage - 1}`];
      aaa = e.bookmarkJSON.indexOf(bbb);
      ccc = e.bookmarkJSON.indexOf(`${bookPage - 1}`);
      fff = e.bookmarkJSON;
    });
    // const strJson = fff.slice(0, ccc - 1) + fff.slice(aaa + bbb.length + 2);

    const strJson =
      fff.slice(0, ccc - 1) +
      fff.slice(
        aaa + bbb.length + 2 === fff.length
          ? aaa + bbb.length + 1
          : aaa + bbb.length + 2,
      );

    await books.postBookmark(bookID, strJson);

    dispatch(
      actions.books.addBookmark({
        bookmark: JSON.parse(strJson),
        document: nameBook,
        bookmarkJSON: strJson,
        bookId: bookID,
      }),
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, activeTab === 0 && styles.activeButton]}
            onPress={onPressBookmarks}>
            <Text
              style={[
                styles.buttonText,
                activeTab === 0 && styles.activeButtonText,
              ]}>
              Bookmarks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, activeTab === 1 && styles.activeButton]}
            onPress={onPressNotes}>
            <Text
              style={[
                styles.buttonText,
                activeTab === 1 && styles.activeButtonText,
              ]}>
              Notes
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === 0 && (
          <ScrollView style={{ width: '100%' }}>
            <View style={styles.bookmarksTab}>
              {bookmarks?.length > 0 ? (
                bookmarks.map((item: IBookmark) =>
                  Object.values(item.bookmark).map(
                    (element: string, index: number) => (
                      <BookmarkComponent
                        onSettingPress={() => {
                          setActiveModal(!activeModal);
                          setBookID(item.bookId);
                          setNameBook(item.document);
                          // @ts-ignore
                          setBookPage(+Object.keys(item.bookmark)[index] + 1);
                        }}
                        key={`${element}${item}`}
                        data={{
                          document: item.document,
                          bookmark: element,
                        }}
                      />
                    ),
                  ),
                )
              ) : (
                <View style={styles.emptyBookmarks}>
                  <Bookmark fill="#455AF7" />
                  <Text style={styles.emptyBookmarksText}>
                    To bookmark click on the bookmark icon
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
        {activeTab === 1 && (
          <View style={styles.bookmarksTab}>
            <View style={styles.emptyBookmarks}>
              <Text style={styles.emptyBookmarksText}>Notes</Text>
            </View>
          </View>
        )}
      </View>
      {activeModal ? (
        <View style={styles.modalContainer}>
          <View
            style={{
              // width: 327,
              height: 180,
              marginHorizontal: 24,
              marginVertical: 8,
              alignItems: 'center',
              // alignItems: 'flex-start',
              justifyContent: 'space-evenly',
              backgroundColor: '#FFF',
              borderRadius: 20,
            }}>
            {/*<View style={{ flexDirection: 'row' }}>*/}
            {/*  <Bookmark fill="#455AF7" width={28} height={28} />*/}
            {/*  <Text*/}
            {/*    onPress={() => {*/}
            {/*      setActiveModal(!activeModal);*/}
            {/*    }}>*/}
            {/*    Change Priority*/}
            {/*  </Text>*/}
            {/*</View>*/}
            <View style={styles.modatlTextContainer}>
              <ForwardIcon />
              <Text
                style={styles.modalText}
                onPress={() => {
                  goToBookmark(bookID);
                }}>
                Go to bookmark
              </Text>
            </View>
            <View style={styles.modatlTextContainer}>
              <ShareIcon />
              <Text
                style={styles.modalText}
                onPress={() => {
                  setActiveModal(!activeModal);
                  return Share.share({ message: 'StaffScreen.sharedTitle' });
                  //
                }}>
                Share bookmark
              </Text>
            </View>
            <View style={styles.modatlTextContainer}>
              <DeleteIcon />
              <Text
                style={[styles.modalText, { color: 'red' }]}
                onPress={() => {
                  deleteBookmark();
                  setActiveModal(!activeModal);
                }}>
                Delete bookmark
              </Text>
            </View>
          </View>
          <View style={styles.cancelContainer}>
            <Text
              onPress={() => {
                setActiveModal(!activeModal);
              }}
              style={styles.cancelText}>
              Cancel
            </Text>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Organaizer;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBookmarks: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBookmarksText: {
    marginTop: 10,
    color: '#4A5568',
    fontSize: 16,
    paddingHorizontal: 80,
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
    paddingVertical: 5,
    alignItems: 'center',
  },
  activeButtonText: {
    color: '#455AF7',
  },
  activeButton: {
    borderBottomColor: '#455AF7',
    borderBottomWidth: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    marginHorizontal: 20,
    color: '#718096',
  },
  bookmarksTab: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#d9d9d9a6',
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    // marginHorizontal: 24,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalText: {
    fontSize: 16,
    marginLeft: 8,
  },
  cancelText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelContainer: {
    height: 40,
    marginHorizontal: 24,
    backgroundColor: 'white',
    borderRadius: 14,
    justifyContent: 'center',
  },
  modatlTextContainer: {
    width: 295,
    height: 38,
    marginHorizontal: 17,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#838c93',
  },
});
