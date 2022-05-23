import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'context/LanguageContext';
import { useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { selectors } from 'store';
import SettingsIcon from 'assets/svg/Settings';
import Bookmark from 'assets/svg/Bookmark';
import BookmarkComponent from 'components/Bookmark/Bookmark';
import { IBookmark } from 'store/ducks/books';

const Organaizer = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Organaizer'>) => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const { UnfilledScreens } = useTranslation();

  const annotaions = useSelector(selectors.books.selectAllAnnotations);
  const bookmarks = useSelector(selectors.books.selectAllBookmarks);

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
          <View style={styles.bookmarksTab}>
            {bookmarks?.length > 0 ? (
              bookmarks.map((item: IBookmark) =>
                Object.values(item.bookmark).map((element: string) => (
                    <BookmarkComponent
                        key={`${element}${item}`}
                        data={{ document: item.document, bookmark: element }}
                    />
                )),
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
        )}
      </View>
    </SafeAreaView>
  );
};

export default Organaizer;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginHorizontal: 24,
    alignItems: 'center',
  },
  button: {
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
});
