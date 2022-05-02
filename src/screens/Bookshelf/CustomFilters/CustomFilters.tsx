import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';
import Checkbox from 'components/Checkbox';
import { Text } from 'components/Text';

const CustomFilters = ({ style }: { style?: any }) => {
  const { BookshelfContext } = useTranslation();
  const { loaded, unloaded } = BookshelfContext.filter;

  const settedFilters = useSelector(selectors.filters.selectCustomFilters);

  const dispatch = useDispatch();

  const setSorting = (value: string) => {
    dispatch(actions.filters.addCustomFilter(value));
  };

  return (
    <View style={style}>
      <View style={styles.line} />
      <TouchableOpacity onPress={() => setSorting('loaded')}>
        <View style={styles.text}>
          <Checkbox
            isActive={
              settedFilters.find(value => value === 'loaded') ? true : false
            }
            style={styles.checkbox}
          />
          <Text text={loaded} />
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity onPress={() => setSorting('unloaded')}>
        <View style={styles.text}>
          <Checkbox
            isActive={
              settedFilters.find(value => value === 'unloaded') ? true : false
            }
            style={styles.checkbox}
          />
          <Text text={unloaded} />
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
    </View>
  );
};

export default CustomFilters;

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#ECF2FA',
  },
  text: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 14,
  },
  checkbox: {
    marginRight: 12,
  },
});
