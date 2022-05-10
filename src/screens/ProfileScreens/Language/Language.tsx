/* eslint-disable react-native/no-inline-styles */
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Card from './components/Card';

import { Text } from 'components/Text';

import { TouchableOpacity } from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import { actions } from 'store';

const Language = () => {
  const selectedLanguage = useSelector(state => state.settings.selectedLanguage)
  const [activeCard, setActiveCard] = useState<string>(selectedLanguage);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();


  const handlePress = (language: string) => {
    setModalTitle(language);
    setIsVisible(true);
  };

  const handleAccept = () => {
    let lang = '';
    switch (modalTitle) {
      case 'English':
        lang = 'en';
        break;
      case 'Deutch':
        lang = 'de';
        break;
      case 'French':
        lang = 'fr';
        break;
      case 'Ukrainian':
        lang = 'ue';
        break;
    }
    dispatch(actions.settings.changeLanguage(lang));
    setActiveCard(modalTitle);
    setIsVisible(false);
  };

  return (
    <>
      <View style={styles.root}>
        <Card
          title="English"
          image={require('assets/images/english.png')}
          style={{ marginBottom: 16 }}
          active={activeCard === 'en'}
          onPress={() => handlePress('English')}
        />
        <Card
          title="Deutch"
          image={require('assets/images/deutch.png')}
          style={{ marginBottom: 16 }}
          active={activeCard === 'de'}
          onPress={() => handlePress('Deutch')}
        />
        <Card
          title="French"
          image={require('assets/images/french.png')}
          style={{ marginBottom: 16 }}
          active={activeCard === 'fr'}
          onPress={() => handlePress('French')}
        />
        <Card
          title="Ukrainian"
          image={require('assets/images/ukrainian.png')}
          style={{ marginBottom: 16 }}
          active={activeCard === 'ue'}
          onPress={() => handlePress('Ukrainian')}
        />
      </View>
      {isVisible && (
        <Pressable
          style={styles.background}
          onPress={() => setIsVisible(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text text={`Change to ${modalTitle}?`} header3 />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderTopWidth: 1,
                  borderTopColor: '#f1e8e8',
                  marginTop: 12,
                }}>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: '#f1e8e8',
                    borderRightWidth: 1,
                  }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setIsVisible(false)}>
                    <Text text="No" label style={{ color: '#DF5334' }} />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleAccept}>
                    <Text text="Yes" header2 style={{ color: '#455AF7' }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      )}
    </>
  );
};

export default Language;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 26,
    paddingVertical: 24,
  },
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(36, 34, 34, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  modal: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxHeight: 100,
    borderRadius: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
  // row: {
  //   flex: 1,
  //   marginTop: 16,
  //   flexDirection: 'row',
  //   borderTopWidth: 1,
  //   borderColor: '#d8d8d8',
  //   // height: '100%',
  //   paddingHorizontal: 16,
  //   backgroundColor: 'green',
  // },
  button: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
