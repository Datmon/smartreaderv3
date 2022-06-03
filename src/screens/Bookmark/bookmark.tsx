/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';
import RightArrow from 'assets/svg/RightArrow';
import FlagIcon from 'assets/svg/FlagIcon';
import BellIcon from 'assets/svg/BellIcon';
import BookIcon from 'assets/svg/BookIcon';
import DocumentIcon from 'assets/svg/DocumentIcon';
import Button from 'components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { useTranslation } from 'context/LanguageContext';

const Bookmark = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'BookmarkScreen'>) => {
  const dispatch = useDispatch();

  const pages = useSelector(selectors.books.selectAllPages);

  console.log('123123', route);

  const summaryPages = useMemo(() => {
    let sum = 0;
    pages.forEach(item => (sum += item.max));
    return sum;
  }, [pages]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text
            onPress={() => {
              navigation.goBack();
            }}>
            Hello
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '90%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: '#EDF2F7',
  },
  button: {
    paddingHorizontal: 16,
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    height: 32,
    width: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  image: {
    width: 40,
    height: 40,
    backgroundColor: '#eae1e1',
    borderRadius: 8,
    marginRight: 10,
  },
});
