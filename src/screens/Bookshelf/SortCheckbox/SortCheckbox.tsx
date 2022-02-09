import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'context/LanguageContext';
import { Text } from 'components/Text';
import Checkbox from 'components/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';

const SortCheckbox = () => {
  const { BookshelfContext } = useTranslation();
  const { byInteraction, byAddnig } = BookshelfContext.filter;

  const settedTypes = useSelector(selectors.filters.selectSortFilter);

  const dispatch = useDispatch();

  const setSorting = (value: string) => {
    dispatch(actions.filters.changeSortFilter(value));
  };

  return (
    <View>
      <View style={styles.line} />
      <TouchableOpacity onPress={() => setSorting('interaction')}>
        <View style={styles.text}>
          <Checkbox
            isActive={settedTypes === 'interaction'}
            style={styles.checkbox}
          />
          <Text text={byInteraction} />
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity onPress={() => setSorting('adding')}>
        <View style={styles.text}>
          <Checkbox
            isActive={settedTypes === 'adding'}
            style={styles.checkbox}
          />
          <Text text={byAddnig} />
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
    </View>
  );
};

export default SortCheckbox;

const styles = StyleSheet.create({
  container: {},
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
