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
import { LanguageContextProvider } from 'context/LanguageContext';
import { Text } from 'components/Text';
import { Modalize } from 'react-native-modalize';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Language = () => {
  const [activeCard, setActiveCard] = useState<string>('English');
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  const handlePress = (language: string) => {
    setModalTitle(language);
    setIsVisible(true);
  };

  const handleAccept = () => {
    setActiveCard(modalTitle);
    setIsVisible(false);
  };

  return (
    <>
      <View style={styles.root}>
        <Modal visible={isVisible} transparent>
          <Pressable
            style={styles.background}
            onPress={() => setIsVisible(false)}>
            {/* <TouchableWithoutFeedback> */}
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
            {/* </TouchableWithoutFeedback> */}
          </Pressable>
        </Modal>

        <Card
          title="English"
          image={require('assets/images/english.png')}
          style={{ marginBottom: 16 }}
          active={activeCard === 'English'}
          onPress={() => handlePress('English')}
        />
        <Card
          title="Deutch"
          image={require('assets/images/deutch.png')}
          style={{ marginBottom: 16 }}
          active={activeCard === 'Deutch'}
          onPress={() => handlePress('Deutch')}
        />
        <Card
          title="French"
          image={require('assets/images/french.png')}
          style={{ marginBottom: 16 }}
          active={activeCard === 'French'}
          onPress={() => handlePress('French')}
        />
        <Card
          title="Ukrainian"
          image={require('assets/images/ukrainian.png')}
          style={{ marginBottom: 16 }}
          active={activeCard === 'Ukrainian'}
          onPress={() => handlePress('Ukrainian')}
        />
      </View>
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
    flex: 1,
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
