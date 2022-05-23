import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Bookmark from 'assets/svg/Bookmark';
import SettingsIcon from 'assets/svg/Settings';
import MoreIcon from 'assets/svg/MoreIcon';
import { IBookmark } from 'store/ducks/books';

const BookmarkComponent = ({
  onSettingPress,
  data,
}: {
  onSettingPress?: () => void;
  data: IBookmark;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View>
          <Bookmark fill="#455AF7" width={28} height={28} />
        </View>
        <TouchableOpacity onPress={onSettingPress}>
          <MoreIcon width={28} height={28} />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {data?.document} : {data?.bookmark}
        </Text>
      </View>
    </View>
  );
};

export default BookmarkComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginHorizontal: 24,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  topView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 10,
  },
  textContainer: {
    width: '90%',
    borderTopColor: '#838c93',
    borderTopWidth: 1,
  },
  text: {
    paddingVertical: 10,
    color: '#27303F',
    fontSize: 14,
    fontWeight: '400',
  },
});
