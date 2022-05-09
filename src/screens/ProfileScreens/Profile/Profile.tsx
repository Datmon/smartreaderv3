/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';
import { Text } from 'components/Text';
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

const Profile = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>) => {
  const dispatch = useDispatch();

  const pages = useSelector(selectors.books.selectAllPages);
  const avatar = useSelector(selectors.auth.selectUserPhoto);
  const language = useSelector(selectors.settings.selectLanguage);
  const { email, username } = useSelector(selectors.auth.selectUserData);

  const logOut = async () => {
    //await StorageService.removeAssessToken();
    dispatch(actions.auth.signOut());
  };

  const { ProfileContext } = useTranslation();

  const {
    saveButton,
    generalSettings,
    emailSub,
    pushNot,
    static,
    logout,
    back,
  } = ProfileContext;

  const summaryPages = useMemo(() => {
    let sum = 0;
    pages.forEach(item => (sum += item.max));
    return sum;
  }, [pages]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <View style={[styles.block, { marginBottom: 16 }]}>
            <TouchableOpacity
              style={[styles.button, { paddingRight: 30 }]}
              onPress={() => navigation.navigate('ProfileSettings')}>
              <View style={styles.row}>
                <Image
                  source={require('assets/images/profile.png')}
                  style={styles.icon}
                />
                <Text text="Profile" header3 style={{ marginLeft: 12 }} />
              </View>
              <RightArrow />
            </TouchableOpacity>
            <View style={styles.line} />
            <View style={[styles.button, { justifyContent: 'flex-start' }]}>
              <Image style={styles.image} source={{ uri: avatar }} />
              <View style={styles.column}>
                <Text text={username} header3 />
                <Text text={email} description />
              </View>
            </View>
          </View>

          <View style={[styles.block, { marginBottom: 16 }]}>
            <View style={[styles.button, { paddingRight: 30 }]}>
              <View style={styles.row}>
                <Image
                  source={require('assets/images/settingIcon.png')}
                  style={styles.icon}
                />
                <Text
                  text="General preferences"
                  header3
                  style={{ marginLeft: 12 }}
                />
              </View>
            </View>

            <View style={styles.line} />

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Language')}>
              <View style={styles.row}>
                <FlagIcon />
                <Text text="Language " header4 style={{ marginLeft: 12 }} />
                <Text text={`(${language})`} label />
              </View>
              <RightArrow />
            </TouchableOpacity>

            <View style={styles.line} />

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Notifications')}>
              <View style={styles.row}>
                <BellIcon />
                <Text text="Notification " header4 style={{ marginLeft: 12 }} />
              </View>
              <RightArrow />
            </TouchableOpacity>
            <View style={[styles.line, { marginBottom: 16 }]} />
          </View>

          <View
            style={[styles.block, { paddingVertical: 10, marginBottom: 24 }]}>
            <View style={[styles.button, { paddingRight: 30 }]}>
              <View style={styles.column}>
                <View style={[styles.row, { alignItems: 'flex-end' }]}>
                  <Text text={pages.length.toString()} header0 />
                  <Text text="books" body14 style={{ marginLeft: 6 }} />
                </View>
                <Text text="read" description />
              </View>
              <BookIcon />
            </View>

            <View style={styles.line} />

            <View style={[styles.button, { paddingRight: 30 }]}>
              <View style={styles.column}>
                <View style={[styles.row, { alignItems: 'flex-end' }]}>
                  <Text text={summaryPages.toString()} header0 />
                  <Text text="pages" body14 style={{ marginLeft: 6 }} />
                </View>
                <Text text="read" description />
              </View>
              <DocumentIcon />
            </View>
          </View>

          <Button title={logout} onPress={logOut} alternative />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

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
