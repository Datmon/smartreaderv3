import { SafeAreaView, StyleSheet, Text } from 'react-native';
import React from 'react';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { actions } from 'store';

const Bookshelf = () => {
  const dispatch = useDispatch();
  const logOut = () => {
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
