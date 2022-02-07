import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { StorageService } from 'services';
import { actions } from 'store';

const Profile = () => {
  const dispatch = useDispatch();

  const logOut = async () => {
    await StorageService.setBeenAuthorized('true');
    console.log('setted to true');
    dispatch(actions.auth.signOut());
  };

  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Button title="Logout" onPress={logOut} />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
