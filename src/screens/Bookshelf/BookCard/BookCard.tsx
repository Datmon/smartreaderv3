import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { IBook } from 'types/interfaces';
import { Text } from 'components/Text';
import Button from 'components/Button';

const BookCard = ({ data }: { data: IBook }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Image source={data.image} />
        <View style={styles.text}>
          <View
            style={[
              styles.format,
              data.format === 'PDF' && { backgroundColor: '#E64D48' },
            ]}>
            <Text text={data.format} style={{ color: 'white' }} />
          </View>
          <Text text={data.title} style={styles.title} />
          <Text text={data.author} label style={styles.author} />

          {data.readed > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/images/hourglass.png')}
                />
                <Text
                  text={'4%'}
                  label
                  style={{ fontSize: 12, color: '#00AB55' }}
                />
              </View>
              <View style={styles.readButton}>
                <Text text="READ" style={{ fontSize: 10, color: '#00AB55' }} />
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/images/hourglassEmpty.png')}
                />
                <Text
                  text="NOT YET READ"
                  label
                  style={{ fontSize: 10, color: '#4A5568' }}
                />
              </View>
              <View style={styles.button}>
                <Text text="DOWNLOAD" style={{ fontSize: 10 }} />
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 16,
    padding: 8,
    flexDirection: 'row',
  },
  text: {
    marginLeft: 12,
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    lineHeight: 22,
    fontSize: 16,
  },
  author: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 2,
  },
  format: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    width: 35,
    height: 18,
    backgroundColor: '#1890FF',
    borderRadius: 4,
  },
  button: {
    borderWidth: 1,
    borderColor: '#A0AEC0',
    borderRadius: 5,
    height: 16,
    paddingHorizontal: 5,
  },
  readButton: {
    borderWidth: 1,
    borderColor: '#00AB55',
    borderRadius: 5,
    height: 16,
    paddingHorizontal: 5,
  },
});
