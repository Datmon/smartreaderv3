import { StyleSheet, View } from 'react-native';
import React from 'react';
import ParamButton from './ParamButton';
import { useSelector } from 'react-redux';
import { selectors } from 'store';

const FormatTabs = ({ style }: { style?: any }) => {
  const types = ['All', 'TXT', 'PDF', 'MOBI', 'FB2'];
  const settedTypes = useSelector(selectors.filters.selectTypeFilter);
  console.log('settedTypes', settedTypes);

  return (
    <View style={[styles.container, style]}>
      {types.map(type => (
        <ParamButton
          key={type}
          format={type}
          active={settedTypes.find(value => type === value) ? true : false}
        />
      ))}
    </View>
  );
};

export default FormatTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
