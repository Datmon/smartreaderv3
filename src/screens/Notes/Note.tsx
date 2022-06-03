/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React, { useEffect, useMemo } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import Bookmark from 'assets/svg/Bookmark';
import MoreIcon from 'assets/svg/MoreIcon';

const NoteScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'NoteScreen'>) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: `${route.params.bookName}`,
    });
    // if (route.params.notes) {
    //   arrayWithNeededObjects(route.params.notes);
    // }
  }, [navigation]);

  const arrayWithNeededObjects = value => {
    const neededArray = [];
    let content, date, color, page;

    const takeText = value => {
      let one;
      let two = [];
      while (value.indexOf('<text') !== -1) {
        one = value.slice(value.indexOf('<text'), value.indexOf('</text>'));
        two.push(one);
        value = value.slice(value.indexOf('</text>') + 7);
      }
      return two;
    };
    const text = takeText(value);
    for (let i of text) {
      content = i.slice(i.indexOf('<contents>') + 10, i.indexOf('</contents>'));
      date = i.slice(i.indexOf('D:') + 2, i.indexOf('Z') + 1);
      color = i.slice(i.indexOf('#'), i.indexOf('#') + 7);
      page = i.slice(i.indexOf('page=') + 6, i.indexOf('rect') - 2);
      neededArray.push({ content, date, color, page });
    }
    return neededArray;
  };

  const arrayWith = arrayWithNeededObjects(route.params.notes);

  console.log('15615611', arrayWith);

  const allPages = useSelector(selectors.books.selectAllPages);

  return (
    // <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        {/*<Text*/}
        {/*  onPress={() => {*/}
        {/*    navigation.goBack();*/}
        {/*  }}>*/}
        {/*  Hello*/}
        {/*</Text>*/}
      </View>
      {arrayWith.length
        ? arrayWith.map(item => (
            <View key={item.page} style={styles.container}>
              <View style={styles.topView}>
                {/*<View*/}
                {/*  style={{ flexDirection: 'row', justifyContent: 'center' }}>*/}
                <Text style={{ color: '#718096' }}>{+item.page + 1}</Text>
                {/*</View>*/}
              </View>
              <View style={styles.textContainer}>
                <Text>{item.content}</Text>
              </View>
            </View>
          ))
        : null}
    </ScrollView>
    // </SafeAreaView>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: 24,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#838c93',
  },
  topView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderTopColor: '#8E878B90',
    borderBottomWidth: 1,
  },
  textContainer: {
    width: '90%',
  },
  text: {
    paddingVertical: 10,
    color: '#27303F',
    fontSize: 14,
    fontWeight: '400',
  },
  root: {
    flex: 1,
    // paddingHorizontal: 24,
    marginVertical: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
