import { SafeAreaView, StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { actions } from 'store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { StorageService } from 'services';

const Bookshelf = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Bookshelf'>) => {
  const dispatch = useDispatch();

  const logOut = async () => {
    await StorageService.setBeenAuthorized('true');
    console.log('setted to true');
    dispatch(actions.auth.signOut());
  };

  return (
    <SafeAreaView>
      <Text>Bookshelf</Text>
      <Button title="logout" onPress={logOut} />
    </SafeAreaView>
  );
};

export default Bookshelf;

const styles = StyleSheet.create({});
