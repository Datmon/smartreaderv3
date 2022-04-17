import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { DocumentView, RNPdftron } from 'react-native-pdftron';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { useSelector } from 'react-redux';
import { selectors } from 'store';

const ReadingSpace = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'ReadingSpace'>) => {
  const accessToken = useSelector(selectors.auth.selectAccessToken);

  var RNFS = require('react-native-fs');

  const [file, setFile] = useState('');

  const path =
    'https://www.readingsanctuary.com/wp-content/uploads/2018/10/fifty-shades-of-grey.pdf';

  const getFile = () => {
    RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result: { path: any }[]) => {
        console.log('GOT RESULT', result);

        const resultId = route.params.bookId;

        const bookIndex = result.findIndex(book => {
          const splitedBook = book.path.split('/');
          return splitedBook.includes(resultId + '.pdf');
        });

        console.log('result[bookIndex].path', result[bookIndex].path);
        return result[bookIndex].path;

        // stat the first file
        return Promise.all([
          RNFS.stat(result[bookIndex].path),
          result[bookIndex].path,
        ]);
      })
      // .then((statResult: any[]) => {
      //   if (statResult[0].isFile()) {
      //     // if we have a file, read it
      //     return RNFS.readFile(statResult[1], 'utf8');
      //   }
      //   return 'no file';
      // })
      // .then((contents: any) => {
      //   // log the file contents
      //   console.log(contents);
      //   setFile(contents);
      // })
      .catch((err: { message: any; code: any }) => {
        console.log(err.message, err.code);
      });
  };

  // const document = 'file:///storage/emulated/0/Download/test.pdf';
  // const document = '/storage/emulated/0/Download/test.pdf';
  const document = '/data/user/0/com.smartReader/files/test.pdf';

  useEffect(() => {
    console.log('accessToken', accessToken);
  }, [accessToken]);

  useEffect(() => {
    getFile();
    RNPdftron.initialize('Insert commercial license key here after purchase');
    RNPdftron.enableJavaScript(true);
    RNPdftron.g;
  }, []);

  return (
    //не установил ios https://github.com/PDFTron/pdftron-react-native#Usage-NPM
    <DocumentView
      document={document}
      bottomToolbarEnabled={false}
      fitMode={'FitWidth'}
      hideAnnotationToolbarSwitcher={true}
      hideTopToolbars={false}
      hideTopAppNavBar={false}
      showLeadingNavButton={true}
      //isBase64String={true}
      leadingNavButtonIcon={
        Platform.OS === 'ios'
          ? 'ic_close_black_24px.png'
          : 'ic_arrow_back_white_24dp'
      }
    />
  );
};

export default ReadingSpace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
